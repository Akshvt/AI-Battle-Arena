import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere";
import { ChatMistralAI } from "@langchain/mistralai";
import config from "../config/config.js";

// Safety check for Render deployment
if (!config.cohereApiKey) console.warn("⚠️ COHERE_API_KEY is missing in configuration!");
if (!config.mistralApiKey) console.warn("⚠️ MISTRAL_API_KEY is missing in configuration!");

export const geminiModel = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-1.5-flash',
});

export const cohereModel = new ChatCohere({
    apiKey: config.cohereApiKey,
    model: 'command-r', // Highly capable, balanced fighter
});

export const mistralModel = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-large-latest', // The heavyweight
});