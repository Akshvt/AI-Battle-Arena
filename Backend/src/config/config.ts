import dotenv from 'dotenv';

dotenv.config();

const config = {
    googleApiKey: process.env.GOOGLE_API_KEY || '',
    mistralApiKey: process.env.MISTRAL_API_KEY || '',
    openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
    nvidiaApiKey: process.env.NVIDIA_API_KEY || '',
}

export default config;