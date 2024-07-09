// src/contexts/AssistantContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react';
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

const initialState: AssistantState = {
  messages: [],
  isLoading: false,
  error: null,
};

const AssistantContext = createContext<{
  state: AssistantState;
  dispatch: React.Dispatch<AssistantAction>;
} | undefined>(undefined);

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
  return (
    <AssistantContext.Provider value={{ state, dispatch }}>
      {children}
    </AssistantContext.Provider>
  );
};

export { AssistantContext };