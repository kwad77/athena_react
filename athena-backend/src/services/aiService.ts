// src/services/aiService.ts

import axios from 'axios';

const OLLAMA_API_URL = 'http://localhost:11434/api';

interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

interface OllamaRequest {
  model: string;
  prompt: string;
  stream?: boolean;
  options?: {
    num_predict?: number;
    top_k?: number;
    top_p?: number;
    temperature?: number;
    stop?: string[];
  };
}

export const generateOllamaResponse = async (
  model: string,
  prompt: string,
  options?: OllamaRequest['options']
): Promise<string> => {
  try {
    const request: OllamaRequest = {
      model,
      prompt,
      options,
    };

    const response = await axios.post<OllamaResponse>(`${OLLAMA_API_URL}/generate`, request);
    return response.data.response;
  } catch (error) {
    console.error('Error generating Ollama response:', error);
    throw error;
  }
};