import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai"
import config from "../config/config.js";

export const geminiModel = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-1.5-pro',
});

export const openRouterJudgeModel = new ChatOpenAI({
    apiKey: config.openRouterApiKey,
    model: 'meta-llama/llama-3.3-70b-instruct:free',
    configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
    },
    temperature: 0.2,
    maxTokens: 150,
    maxRetries: 2,
});

export const mistralModel = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-medium-latest',
});