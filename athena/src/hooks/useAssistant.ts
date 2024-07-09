import { useState } from 'react';
import { sendMessageToAI, loadAssistantConfig } from '../services/aiService';
import { Assistant, Message } from '../types';

export const useAssistant = () => {
  const [assistantConfig, setAssistantConfig] = useState<Assistant | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string): Promise<string> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sendMessageToAI(content);
      return response;
    } catch (error) {
      console.error('Error sending message to AI:', error);
      setError('Failed to send message to AI');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loadAssistant = async (assistantId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const config = await loadAssistantConfig(assistantId);
      setAssistantConfig(config);
    } catch (error) {
      console.error('Error loading assistant configuration:', error);
      setError('Failed to load assistant configuration');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    // This function would be implemented if we were managing conversation state here
    // For now, it's just a placeholder
    console.log('Clearing conversation');
  };

  return {
    assistantConfig,
    isLoading,
    error,
    sendMessage,
    loadAssistant,
    clearConversation,
  };
};