// src/routes/chat.ts

import express from 'express';
import { generateOllamaResponse } from '../services/aiService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, model = 'llama3' } = req.body; // Default to llama2 if no model specified
    const response = await generateOllamaResponse(model, message);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

export { router as chatRouter };