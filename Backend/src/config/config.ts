import dotenv from 'dotenv';

dotenv.config();

const config = {
    cohereApiKey: process.env.COHERE_API_KEY || '',
    googleApiKey: process.env.GOOGLE_API_KEY || '',
    mistralApiKey: process.env.MISTRAL_API_KEY || '',
    openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
}

export default config;