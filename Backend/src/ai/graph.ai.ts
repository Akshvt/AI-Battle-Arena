import { StateGraph, START, END, StateSchema, type GraphNode, type CompiledStateGraph } from "@langchain/langgraph";
import z from "zod";
import { mistralPrimary, mistralFallback, openRouterPrimary, openRouterFallback, geminiPrimary, geminiFallback } from "./model.ai.js";
import { createAgent, providerStrategy /*for gemini*/, toolStrategy /*for other models*/ } from "langchain";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

/*
StateSchema => Defines the structure of the state in the graph, including properties and their types.
Nodes jo data aapas me exchange karte hain toh uss data ka format kya hoga, uske liye StateSchema define karte hain.
 */

const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    solution_1_model: z.string().default(""),
    solution_2_model: z.string().default(""),
    solution_1_stats: z.object({ time: z.number(), tokens: z.number() }).default({ time: 0, tokens: 0 }),
    solution_2_stats: z.object({ time: z.number(), tokens: z.number() }).default({ time: 0, tokens: 0 }),
    judge_model: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default(""),
    })

})

const fighterSystemPrompt = new SystemMessage(
    "You are an elite competitive programmer. You must follow these STRICT RULES:\n" +
    "1. Output ONLY the raw optimized code to solve the problem.\n" +
    "2. Below the code, provide ONLY the Time and Space complexity (Big-O).\n" +
    "3. DO NOT output 'Recommendations', 'Summaries', 'Alternative approaches', or any conversational text.\n" +
    "4. Be absolutely as concise as possible."
);

// Helper: invoke a model with try/catch fallback, returns { res, time, modelName }
async function invokeWithFallback(
    primary: any,
    fallback: any,
    primaryName: string,
    fallbackName: string,
    messages: any[]
) {
    const start = Date.now();
    try {
        const res = await primary.invoke(messages);
        return { res, time: Date.now() - start, modelName: primaryName };
    } catch (error) {
        console.warn(`${primaryName} failed, switching to ${fallbackName}:`, (error as any)?.message || error);
        const fallbackStart = Date.now();
        const res = await fallback.invoke(messages);
        return { res, time: Date.now() - fallbackStart, modelName: fallbackName };
    }
}

const solutionNode: GraphNode<typeof state> = async (state) => {
    const messages = [fighterSystemPrompt, new HumanMessage(state.problem)];

    const [mistralData, geminiData] = await Promise.all([
        invokeWithFallback(mistralPrimary, mistralFallback, 'Mistral Medium', 'Mistral Medium 3', messages),
        invokeWithFallback(geminiPrimary, geminiFallback, 'Gemini 3 Flash', 'Gemini 2.5 Flash', messages),
    ]);

    const getTokens = (res: any) => {
        return res.usage_metadata?.total_tokens || 
               res.response_metadata?.tokenUsage?.totalTokens || 
               Math.floor(res.text.length / 4);
    };

    return {
        solution_1: mistralData.res.text,
        solution_2: geminiData.res.text,
        solution_1_model: mistralData.modelName,
        solution_2_model: geminiData.modelName,
        solution_1_stats: { time: mistralData.time / 1000, tokens: getTokens(mistralData.res) },
        solution_2_stats: { time: geminiData.time / 1000, tokens: getTokens(geminiData.res) },
    }
}

const judgeNode: GraphNode<typeof state> = async (state) => {
    const { problem, solution_1, solution_2 } = state;

    /**
     * judge response = {
     * solution_1_score:7,
     * solution_2_score:3,
     * solution_1_reasoning: "reasoning for sol 1",
     * solution_2_reasoning: "reasoning for sol 2"
     * }
    */

    const judgeSchema = toolStrategy(z.object({
        solution_1_score: z.number().int().min(0).max(10),
        solution_2_score: z.number().int().min(0).max(10),
        solution_1_reasoning: z.string(),
        solution_2_reasoning: z.string(),
    }));

    const systemPrompt = `You are an expert, impartial AI judge evaluating two solutions to a coding/logic problem. 

CRITICAL JUDGING CRITERIA:
1. Correctness: Does the solution actually work and solve the problem accurately? (Most important)
2. Efficiency: Are the time and space complexity optimal?
3. ANTI-BIAS RULES: 
   - DO NOT penalize a solution for being concise. 
   - DO NOT reward a solution simply for being longer or adding unnecessary sections (like "Recommendations" or summaries).
   - DO NOT judge based on Markdown formatting or aesthetic presentation.
   - Grade strictly on the raw technical merit and accuracy of the code/logic.

Provide a score (0-10) and brief, technical reasoning.`;

    const judgePrimary = createAgent({
        model: openRouterPrimary,
        responseFormat: judgeSchema,
        systemPrompt: systemPrompt
    });

    const judgeFallback = createAgent({
        model: openRouterFallback,
        responseFormat: judgeSchema,
        systemPrompt: systemPrompt
    });

    let judgeResponse;
    let judgeModelName = '';
    const evaluationMessage = new HumanMessage(`
                Problem: ${problem}
                Solution 1: ${solution_1}
                Solution 2: ${solution_2}
                Please evaluate the solutions and provide scores and reasoning.
                `);

    try {
        judgeResponse = await judgePrimary.invoke({
            messages: [evaluationMessage]
        });
        judgeModelName = 'DeepSeek V4 Flash';
    } catch (error) {
        console.warn("Primary judge failed, switching to fallback:", (error as any)?.message || error);
        judgeResponse = await judgeFallback.invoke({
            messages: [evaluationMessage]
        });
        judgeModelName = 'Llama 3.3 70B';
    }

    const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judgeResponse.structuredResponse;

    return {
        judge_model: judgeModelName,
        judge: {
            solution_1_score,
            solution_2_score,
            solution_1_reasoning,
            solution_2_reasoning
        }
    }
}

const graph = new StateGraph(state)
    .addNode("solutionNode", solutionNode)
    .addNode("judgeNode", judgeNode)
    .addEdge(START, "solutionNode")
    .addEdge("solutionNode", "judgeNode")
    .addEdge("judgeNode", END)
    .compile()

    export  default async function (problem: string) {
        const result = await graph.invoke({
            problem: problem
        })

        return result
    }
