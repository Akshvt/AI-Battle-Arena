import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai"
import config from "../config/config.js";

export const geminiModel = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-flash-latest', 
});

export const deepseekModel = new ChatOpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    model: 'deepseek-chat',
    configuration: {
        baseURL: 'https://api.deepseek.com/v1',
    },
    temperature: 0.2,
    maxTokens:150,
    maxRetries:2,
});

export const mistralModel = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-medium-latest',
});