import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatOpenAI } from "@langchain/openai";
import config from "../config/config.js";

// ==========================================
// FIGHTER A - Mistral Medium (Default)
// ==========================================
export const FIGHTER_A_NAME = 'Mistral Medium';
export const fighterAModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: config.mistralApiKey,
    temperature: 0.7,
    maxTokens: 2000,
});

// ==========================================
// FIGHTER B - CURRENTLY SELECTED
// ==========================================
export const FIGHTER_B_NAME = 'Mistral Large';
export const fighterBModel = new ChatMistralAI({
    model: "mistral-large-latest",
    apiKey: config.mistralApiKey,
    temperature: 0.7,
    maxTokens: 2000,
});

/* 
// OPTION: Gemini 2.5 Pro (via OpenRouter)
export const FIGHTER_B_NAME = 'Gemini 2.5 Pro';
export const fighterBModel = new ChatOpenAI({
    apiKey: config.openRouterApiKey,
    model: 'google/gemini-2.5-pro',
    temperature: 0.7,
    maxTokens: 2000,
    configuration: { baseURL: 'https://openrouter.ai/api/v1' },
});
*/

/* 
// OPTION: Llama 3.3 70B (via NVIDIA NIM)
export const FIGHTER_B_NAME = 'Llama 3.3 70B';
export const fighterBModel = new ChatOpenAI({
    apiKey: config.nvidiaApiKey,
    model: 'meta/llama-3.3-70b-instruct',
    temperature: 0.7,
    maxTokens: 2000,
    configuration: { baseURL: 'https://integrate.api.nvidia.com/v1' },
});
*/

/* 
// OPTION: Qwen3 Coder 480B (via NVIDIA NIM)
export const FIGHTER_B_NAME = 'Qwen3 Coder 480B';
export const fighterBModel = new ChatOpenAI({
    apiKey: config.nvidiaApiKey,
    model: 'qwen/qwen3-coder-480b-a35b-instruct',
    temperature: 0.7,
    maxTokens: 2000,
    configuration: { baseURL: 'https://integrate.api.nvidia.com/v1' },
});
*/


// ==========================================
// JUDGE - CURRENTLY SELECTED
// ==========================================
export const JUDGE_NAME = 'Mistral Small';
export const judgeModel = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-small-latest',
    temperature: 0,
    maxTokens: 400,
});

/* 
// OPTION: GPT-4o Mini (via OpenRouter)
export const JUDGE_NAME = 'GPT-4o Mini';
export const judgeModel = new ChatOpenAI({
    apiKey: config.openRouterApiKey,
    model: 'openai/gpt-4o-mini',
    temperature: 0,
    maxTokens: 400,
    configuration: { baseURL: 'https://openrouter.ai/api/v1' },
});
*/

/* 
// OPTION: Gemini 2.0 Flash (via Google API)
export const JUDGE_NAME = 'Gemini 2.0 Flash';
export const judgeModel = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-2.0-flash',
    temperature: 0,
    maxOutputTokens: 400,
});
*/