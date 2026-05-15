import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere";     
import { ChatMistralAI } from "@langchain/mistralai";
import config from "../config/config.js";


export const geminiModel = new ChatGoogle({
    apiKey: config.googleApiKey,
    model: 'gemini-1.5-flash',
});

export const cohereModel = new ChatCohere({
    apiKey: config.cohereApiKey,
    model: 'command-r-plus',
});

export const mistralModel = new ChatMistralAI({
    apiKey: config.mistralApiKey,
    model: 'mistral-large-latest',
});