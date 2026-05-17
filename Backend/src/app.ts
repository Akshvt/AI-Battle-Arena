import express from 'express';
import cors from 'cors';
import runGraph from './ai/graph.ai.js';
import { FIGHTER_A_NAME, FIGHTER_B_NAME, JUDGE_NAME } from './ai/model.ai.js';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://ai-battle-arena-silk.vercel.app',
  ],
  credentials: true,
  methods: ['GET', 'POST'],
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/models', (req, res) => {
  res.json({
    fighterA: FIGHTER_A_NAME,
    fighterB: FIGHTER_B_NAME,
    judge: JUDGE_NAME
  });
});

app.post('/api/battle', async (req, res) => {
  try {
    const { problem } = req.body;
    if (!problem) {
      return res.status(400).json({ error: 'Problem is required' });
    }
    
    console.log(`Battle started for: ${problem.substring(0, 50)}...`);
    const result = await runGraph(problem);
    res.json(result);
  } catch (error: any) {
    console.error('Battle error:', error);
    res.status(500).json({ error: error.message || 'Internal server error during the battle', stack: error.stack });
  }
});

export default app;