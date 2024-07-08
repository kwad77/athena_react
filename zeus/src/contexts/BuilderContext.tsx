// zeus\src\contexts\BuilderContext.tsx

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Assistant, Component } from '../types/builder';
import { BuilderService } from '../services/BuilderService';

interface BuilderState {
  currentAssistant: Assistant | null;
  availableComponents: Component[];
  isLoading: boolean;
  error: string | null;
}

type BuilderAction =
  | { type: 'SET_CURRENT_ASSISTANT'; payload: Assistant }
  | { type: 'UPDATE_ASSISTANT'; payload: Partial<Assistant> }
  | { type: 'SET_AVAILABLE_COMPONENTS'; payload: Component[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: BuilderState = {
  currentAssistant: null,
  availableComponents: [],
  isLoading: false,
  error: null,
};

const BuilderContext = createContext<{
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
  loadAssistant: (id: string) => Promise<void>;
  saveAssistant: () => Promise<void>;
} | undefined>(undefined);

const builderReducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case 'SET_CURRENT_ASSISTANT':
      return { ...state, currentAssistant: action.payload };
    case 'UPDATE_ASSISTANT':
      return state.currentAssistant
        ? { ...state, currentAssistant: { ...state.currentAssistant, ...action.payload } }
        : state;
    case 'SET_AVAILABLE_COMPONENTS':
      return { ...state, availableComponents: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  const loadAssistant = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const assistant = await BuilderService.getAssistant(id);
      dispatch({ type: 'SET_CURRENT_ASSISTANT', payload: assistant });
      const components = await BuilderService.getAvailableComponents();
      dispatch({ type: 'SET_AVAILABLE_COMPONENTS', payload: components });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load assistant' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveAssistant = async () => {
    if (!state.currentAssistant) return;
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await BuilderService.saveAssistant(state.currentAssistant);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save assistant' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <BuilderContext.Provider value={{ state, dispatch, loadAssistant, saveAssistant }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilderContext must be used within a BuilderProvider');
  }
  return context;
};