import { useContext } from 'react';
import { AssistantContext } from '../contexts/AssistantContext';
import { Message } from '../types';
import { sendMessageToAI } from '../services/aiService'; // You'll need to create this service

export const useAssistant = () => {
  const context = useContext(AssistantContext);

  if (!context) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }

  const { state, dispatch } = context;

  const sendMessage = async (content: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Add user message to the state
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        sender: 'user',
        timestamp: new Date(),
      };
      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

      // Send message to AI and get response
      const aiResponse = await sendMessageToAI(content);

      // Add AI response to the state
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };
      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to send message to AI' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearConversation = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearConversation,
  };
};