// src/routes/chat.ts

import express from 'express';
import { generateAIResponse } from '../services/aiService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await generateAIResponse(message);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

export { router as chatRouter };