import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai"
import config from "../config/config.js";

const geminiPrimary = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-3-flash-preview',
    maxRetries: 1,
});

const geminiFallback = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-2.5-flash',
    maxRetries: 2,
});

export const geminiModel = geminiPrimary.withFallbacks({
    fallbacks: [geminiFallback],
});

export const openRouterPrimary = new ChatOpenAI({
    apiKey: config.openRouterApiKey,
    model: 'meta-llama/llama-3.3-70b-instruct:free',
    configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
    },
    temperature: 0.2,
    maxTokens: 150,
    maxRetries: 1,
});

export const openRouterFallback = new ChatOpenAI({
    apiKey: config.openRouterApiKey,
    model: 'nousresearch/hermes-3-llama-3.1-405b:free',
    configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
    },
    temperature: 0.2,
    maxTokens: 150,
    maxRetries: 2,
});

const mistralPrimary = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-medium-latest',
    maxRetries: 1,
});

const mistralFallback = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-medium-3',
    maxRetries: 2,
});

export const mistralModel = mistralPrimary.withFallbacks({
    fallbacks: [mistralFallback],
});