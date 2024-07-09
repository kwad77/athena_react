// src/server.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { chatRouter } from './routes/chat';
import { assistantsRouter } from './routes/assistants';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRouter);
app.use('/api/assistants', assistantsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});