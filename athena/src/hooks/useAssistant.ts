import { useContext } from 'react';
import { AssistantContext } from '../contexts/AssistantContext';
import { Message } from '../types';
import { sendMessageToAI, loadAssistantConfig } from '../services/aiService';

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

  const loadAssistant = async (assistantId: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const assistantConfig = await loadAssistantConfig(assistantId);
      dispatch({ type: 'SET_ASSISTANT_CONFIG', payload: assistantConfig });

      // You might want to load previous messages here as well
      // const previousMessages = await loadPreviousMessages(assistantId);
      // dispatch({ type: 'SET_MESSAGES', payload: previousMessages });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load assistant configuration' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearConversation = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  return {
    messages: state.messages,
    assistantConfig: state.assistantConfig,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    loadAssistant,
    clearConversation,
  };
};