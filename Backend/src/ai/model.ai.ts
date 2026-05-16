import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai"
import config from "../config/config.js";

// --- Gemini Fighter Models ---
const geminiPrimary = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-3-flash-preview',
    maxOutputTokens: 300,
    maxRetries: 1,
});

const geminiFallback = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-2.5-flash',
    maxOutputTokens: 300,
    maxRetries: 2,
});

export { geminiPrimary, geminiFallback };

// --- OpenRouter Judge Models ---
// DeepSeek is primary because Llama 3.3 free tier is constantly rate-limited/spend-limited on Venice
export const openRouterPrimary = new ChatOpenAI({
    apiKey: config.openRouterApiKey,
    model: 'deepseek/deepseek-v4-flash:free',
    configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
    },
    temperature: 0.2,
    maxTokens: 500,
    maxRetries: 1,
});

export const openRouterFallback = new ChatOpenAI({
    apiKey: config.openRouterApiKey,
    model: 'meta-llama/llama-3.3-70b-instruct:free',
    configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
    },
    temperature: 0.2,
    maxTokens: 500,
    maxRetries: 1,
});

// --- Mistral Fighter Models ---
const mistralPrimary = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-medium-latest',
    maxTokens: 300,
    maxRetries: 1,
});

const mistralFallback = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-medium-3',
    maxTokens: 300,
    maxRetries: 2,
});

export { mistralPrimary, mistralFallback };