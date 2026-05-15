import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import config from "../config/config.js";

export const geminiModel = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-1.5-flash-latest', // Using the latest alias for maximum compatibility
});

// Using Mistral API for both fighters to ensure 100% stability on Render
export const cohereModel = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-small-latest', 
});

export const mistralModel = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-medium-latest',
});