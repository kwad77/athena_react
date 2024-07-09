// src/routes/assistants.ts

import express from 'express';
import { getAssistants, getAssistantById } from '../services/assistantService';

const router = express.Router();

router.get('/', (req, res) => {
  const assistants = getAssistants();
  res.json(assistants);
});

router.get('/:id', (req, res) => {
  const assistant = getAssistantById(req.params.id);
  if (assistant) {
    res.json(assistant);
  } else {
    res.status(404).json({ error: 'Assistant not found' });
  }
});

export { router as assistantsRouter };