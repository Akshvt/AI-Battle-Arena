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

// --- OpenRouter Judge Models (all free, all support tool calling) ---
// Multiple fallbacks because free tier models get rate-limited constantly
const judgeConfig = {
    apiKey: config.openRouterApiKey,
    configuration: { baseURL: 'https://openrouter.ai/api/v1' },
    temperature: 0.2,
    maxTokens: 500,
    maxRetries: 0, // fail fast, move to next model
};

export const judgeModels = [
    { model: new ChatOpenAI({ ...judgeConfig, model: 'deepseek/deepseek-v4-flash:free' }), name: 'DeepSeek V4 Flash' },
    { model: new ChatOpenAI({ ...judgeConfig, model: 'qwen/qwen3-next-80b-a3b-instruct:free' }), name: 'Qwen3 80B' },
    { model: new ChatOpenAI({ ...judgeConfig, model: 'google/gemma-4-31b-it:free' }), name: 'Gemma 4 31B' },
    { model: new ChatOpenAI({ ...judgeConfig, model: 'nvidia/nemotron-3-super-120b-a12b:free' }), name: 'Nemotron 120B' },
];

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