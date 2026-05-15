import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai";
import config from "../config/config.js";

export const geminiModel = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-1.5-flash',
});

export const cohereModel = new ChatOpenAI({
    model: "cohere/command-r-03-2025",
    apiKey: config.openRouterApiKey,
    configuration: {
        baseURL: "https://openrouter.ai/api/v1",
    }
});

export const mistralModel = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-large-latest',
});