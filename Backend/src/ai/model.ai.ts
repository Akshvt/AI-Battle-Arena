import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai";
import config from "../config/config.js";

export const geminiModel = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-1.5-flash',
});

export const cohereModel = new ChatOpenAI({
    model: "meta-llama/llama-3-70b-instruct", // The Open-Source King
    apiKey: config.openRouterApiKey,
    configuration: {
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
            "HTTP-Referer": "https://ai-battle-arena-silk.vercel.app",
            "X-Title": "AI Battle Arena",
        }
    }
});

export const mistralModel = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-large-latest', // Europe's Heavyweight
});