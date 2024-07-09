// src/services/aiService.ts

import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateAIResponse = async (message: string): Promise<string> => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Human: ${message}\nAI:`,
      max_tokens: 150,
      n: 1,
      stop: ["Human:", "AI:"],
      temperature: 0.7,
    });

    return completion.data.choices[0].text?.trim() || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
};