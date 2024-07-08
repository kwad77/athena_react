import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Message } from '../types';

interface AssistantState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

type AssistantAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_MESSAGES' };

interface AssistantContextType extends AssistantState {
  sendMessage: (content: string) => Promise<void>;
  clearConversation: () => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

const initialState: AssistantState = {
  messages: [],
  isLoading: false,
  error: null,
};

const assistantReducer = (state: AssistantState, action: AssistantAction): AssistantState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    default:
      return state;
  }
};

export const AssistantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(assistantReducer, initialState);

  const sendMessage = async (content: string) => {
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

      // TODO: Implement actual API call to AI service here
      // For now, we'll simulate a response after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Echo: ${content}`, // Replace with actual AI response
        sender: 'assistant',
        timestamp: new Date(),
      };
      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to send message' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearConversation = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  return (
    <AssistantContext.Provider value={{ ...state, sendMessage, clearConversation }}>
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = (): AssistantContextType => {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};