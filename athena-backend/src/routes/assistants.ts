// src/routes/assistants.ts

import express from 'express';
import { getAssistants, getAssistantById } from '../services/assistantService';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('GET request received for /api/assistants');
  try {
    const assistants = getAssistants();
    console.log('Assistants retrieved:', assistants);
    res.json(assistants);
  } catch (error) {
    console.error('Error getting assistants:', error);
    res.status(500).json({ error: 'Failed to retrieve assistants' });
  }
});

router.get('/:id', (req, res) => {
  console.log(`GET request received for /api/assistants/${req.params.id}`);
  try {
    const assistant = getAssistantById(req.params.id);
    if (assistant) {
      console.log('Assistant found:', assistant);
      res.json(assistant);
    } else {
      console.log('Assistant not found');
      res.status(404).json({ error: 'Assistant not found' });
    }
  } catch (error) {
    console.error('Error getting assistant:', error);
    res.status(500).json({ error: 'Failed to retrieve assistant' });
  }
});

export { router as assistantsRouter };