import express from 'express';
import cors from 'cors';
import runGraph from './ai/graph.ai.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
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
  } catch (error) {
    console.error('Battle error:', error);
    res.status(500).json({ error: 'Internal server error during the battle' });
  }
});

export default app;