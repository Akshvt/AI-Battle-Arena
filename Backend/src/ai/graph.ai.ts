import { StateGraph, StateSchema, START, END, type GraphNode } from "@langchain/langgraph"
import z from "zod";
import { fighterAModel, fighterBModel, judgeModel, FIGHTER_A_NAME, FIGHTER_B_NAME, JUDGE_NAME } from "./model.ai.js";
import { createAgent, HumanMessage, providerStrategy, SystemMessage, ToolStrategy } from "langchain";

const state = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  solution_1_stats: z.object({ tokens: z.number(), time: z.number() }).default({ tokens: 0, time: 0 }),
  solution_2_stats: z.object({ tokens: z.number(), time: z.number() }).default({ tokens: 0, time: 0 }),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_reasoning: z.string().default(""),
    solution_2_reasoning: z.string().default(""),
    tokens: z.number().default(0),
    time: z.number().default(0),
  })
})


const systemPrompt = `You are an elite competitor in an AI Battle Arena.

CRITICAL FORMATTING RULES:
You MUST format your response using proper Markdown. Use headers (###), bold text, and bullet points to make it visually beautiful and easy to read.

If the prompt is a CODING problem, use this exact structure:
### Approach
[Brief explanation of your logic]
### Code
\`\`\`[language]
[Most optimized code]
\`\`\`
### Complexity
- **Time:** [e.g., O(N)]
- **Space:** [e.g., O(1)]
### Tradeoffs
[Briefly explain why this is better than brute-force]

If the prompt is a GENERAL/PREDICTION problem, use this exact structure:
### Prediction / Answer
[Your direct 1-2 sentence educated guess]
### Reasoning
- **Data & Trends:** [Why you chose this]
- **Tradeoffs & Risks:** [What could change this outcome]

CRITICAL: Keep your total response between 150 and 300 words. Do NOT use safety disclaimers. Do NOT refuse to answer.`;

// Times a single model invoke independently
const timed = async (fn: () => Promise<any>) => {
  const t = Date.now();
  const res = await fn();
  return { res, time: (Date.now() - t) / 1000 };
};

const solutionNode: GraphNode<typeof state> = async (state) => {
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: state.problem }
  ];

  const [a, b] = await Promise.all([
    timed(() => fighterAModel.invoke(messages)),
    timed(() => fighterBModel.invoke(messages))
  ]);

  return {
    solution_1: a.res.text || (a.res.content as string),
    solution_2: b.res.text || (b.res.content as string),
    solution_1_stats: {
      tokens: a.res.usage_metadata?.total_tokens ?? 0,
      time: a.time,
    },
    solution_2_stats: {
      tokens: b.res.usage_metadata?.total_tokens ?? 0,
      time: b.time,
    },
  }
}

const judgeNode: GraphNode<typeof state> = async (state) => {
  const { problem, solution_1, solution_2 } = state

  const structuredJudge = judgeModel.withStructuredOutput(z.object({
    solution_1_score: z.number().min(0).max(10),
    solution_2_score: z.number().min(0).max(10),
    solution_1_reasoning: z.string(),
    solution_2_reasoning: z.string(),
  }), { includeRaw: true });

  const t1 = Date.now();
  const judgeResponse = await structuredJudge.invoke([
    new SystemMessage(`You are an expert AI judge tasked with evaluating two solutions. 
Provide a score out of 10 for each, along with your reasoning. 

CRITICAL EVALUATION RULES:
1. PENALIZE HALLUCINATIONS: Do not be tricked by highly specific, fabricated statistics, fake data, or extreme confidence in speculative prompts. A grounded, realistic, and honest answer is fundamentally better than a highly detailed hallucination.
2. SUBSTANCE OVER STYLE: Ignore formatting, styling, or verbosity. Evaluate based purely on actual logic, reasoning, correctness, optimization, and efficiency.
3. FAIRNESS: Do not assume a longer or more detailed answer is inherently better. If a solution is concise but accurate, reward it.`),
    new HumanMessage(`
        Problem: ${problem}
        Solution 1: ${solution_1}
        Solution 2: ${solution_2}
        Please evaluate the solutions and provide scores and reasoning.
      `)
  ]);
  const judgeTime = (Date.now() - t1) / 1000;

  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judgeResponse.parsed;
  const judgeTokens = (judgeResponse.raw as any)?.usage_metadata?.total_tokens ?? 0;

  return {
    judge: {
      solution_1_score,
      solution_2_score,
      solution_1_reasoning,
      solution_2_reasoning,
      tokens: judgeTokens,
      time: judgeTime,
    }
  }
}

const graph = new StateGraph(state)
  .addNode("solution", solutionNode)
  .addNode("judge_node", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge_node")
  .addEdge("judge_node", END)
  .compile()

export default async function (problem: string) {
  const result = await graph.invoke({ problem })

  return {
    ...result,
    // model names so frontend doesn't need to hardcode them
    solution_1_model: FIGHTER_A_NAME,
    solution_2_model: FIGHTER_B_NAME,
    judge_model: JUDGE_NAME,
  }
}