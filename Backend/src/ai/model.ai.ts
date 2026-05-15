import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere";
import { ChatMistralAI } from "@langchain/mistralai";
import config from "../config/config.js";



export const geminiModel = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-flash-latest',
});

export const cohereModel = new ChatCohere({
    apiKey: config.cohereApiKey,
    model: 'command-r-03-2025', 
});

export const mistralModel = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-medium-latest', 
});