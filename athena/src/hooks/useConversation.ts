import { useState, useEffect, useCallback } from 'react';
import { Message } from '../types';
import { fetchConversationHistory, saveMessage } from '../services/conversationService'; // You'll need to create this service

export const useConversation = (conversationId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadConversationHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const history = await fetchConversationHistory(conversationId);
      setMessages(history);
    } catch (err) {
      setError('Failed to load conversation history');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    loadConversationHistory();
  }, [loadConversationHistory]);

  const addMessage = async (content: string, sender: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);

    try {
      await saveMessage(conversationId, newMessage);
    } catch (err) {
      setError('Failed to save message');
      console.error(err);
      // Optionally, remove the message from the state if it failed to save
      // setMessages(prevMessages => prevMessages.filter(msg => msg.id !== newMessage.id));
    }
  };

  const clearConversation = () => {
    setMessages([]);
    // You might want to add an API call here to clear the conversation on the server as well
  };

  return {
    messages,
    isLoading,
    error,
    addMessage,
    clearConversation,
    refreshConversation: loadConversationHistory,
  };
};