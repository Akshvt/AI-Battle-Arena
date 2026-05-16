import dotenv from 'dotenv';

dotenv.config();

const config = {
    googleApiKey: process.env.GOOGLE_API_KEY || '',
    mistralApiKey: process.env.MISTRAL_API_KEY || '',
    deepseekApiKey: process.env.DEEPSEEK_API_KEY || '',
}

export default config;