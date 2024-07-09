// src/services/aiService.ts

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const sendMessageToAI = async (message: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return response.data.response;
  } catch (error) {
    console.error('Error sending message to AI:', error);
    throw error;
  }
};

export const loadAssistantConfig = async (assistantId: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/assistants/${assistantId}`);
    return response.data;
  } catch (error) {
    console.error('Error loading assistant configuration:', error);
    throw error;
  }
};