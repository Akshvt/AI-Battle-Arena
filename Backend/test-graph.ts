import graph from './src/ai/graph.ai.js';
import dotenv from 'dotenv';
dotenv.config();

graph('fibonacci').then(res => {
    console.log(JSON.stringify(res, null, 2));
}).catch(err => {
    console.error("GRAPH ERROR:", err);
});
