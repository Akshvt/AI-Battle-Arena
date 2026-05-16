import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai"
import config from "../config/config.js";

const openRouterConfig = {
    apiKey: config.openRouterApiKey,
    configuration: { baseURL: 'https://openrouter.ai/api/v1' },
};

// --- Fighter B: OpenRouter Free Coding Models (replaces Gemini thinking models) ---
const fighterBPrimary = new ChatOpenAI({
    ...openRouterConfig,
    model: 'qwen/qwen3-coder:free',
    temperature: 0.2,
    maxTokens: 800,
    maxRetries: 1,
});

const fighterBFallback = new ChatOpenAI({
    ...openRouterConfig,
    model: 'deepseek/deepseek-v4-flash:free',
    temperature: 0.2,
    maxTokens: 800,
    maxRetries: 2,
});

export { fighterBPrimary, fighterBFallback };

// --- OpenRouter Judge Models (all free, all support tool calling) ---
// Multiple fallbacks because free tier models get rate-limited constantly
const judgeConfig = {
    ...openRouterConfig,
    temperature: 0.2,
    maxTokens: 500,
    maxRetries: 0, // fail fast, move to next model
};

export const judgeModels = [
    { model: new ChatOpenAI({ ...judgeConfig, model: 'deepseek/deepseek-v4-flash:free' }), name: 'DeepSeek V4 Flash' },
    { model: new ChatOpenAI({ ...judgeConfig, model: 'qwen/qwen3-next-80b-a3b-instruct:free' }), name: 'Qwen3 80B' },
    { model: new ChatOpenAI({ ...judgeConfig, model: 'google/gemma-4-31b-it:free' }), name: 'Gemma 4 31B' },
    { model: new ChatOpenAI({ ...judgeConfig, model: 'nvidia/nemotron-3-super-120b-a12b:free' }), name: 'Nemotron 120B' },
    { model: new ChatOpenAI({ ...judgeConfig, model: 'openai/gpt-oss-120b:free' }), name: 'GPT-OSS 120B' },
];

// --- Fighter A: Mistral Models ---
const mistralPrimary = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-medium-latest',
    maxTokens: 800,
    maxRetries: 1,
});

const mistralFallback = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-medium-3',
    maxTokens: 800,
    maxRetries: 2,
});

export { mistralPrimary, mistralFallback };