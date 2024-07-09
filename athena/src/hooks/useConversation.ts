import { useState, useEffect, useCallback } from 'react';
import { Message } from '../types';
import { apiService } from '../services/ApiService';

export const useConversation = (conversationId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConversationHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const history = await apiService.getConversationHistory(conversationId);
        setMessages(history);
      } catch (err) {
        setError('Failed to load conversation history');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversationHistory();
  }, [conversationId]);

  const addMessage = async (content: string, sender: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      conversationId
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);

    try {
      await apiService.sendMessage(conversationId, newMessage);
    } catch (err) {
      setError('Failed to save message');
      console.error(err);
    }
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    error,
    addMessage,
    clearConversation,
  };
};