// zeus\src\hooks\useAssistantConfig.ts

import { useContext, useCallback } from 'react';
import { BuilderContext } from '../contexts/BuilderContext';
import { Assistant, Component } from '../types/builder';

interface UseAssistantConfigReturn {
  assistantConfig: Assistant | null;
  updateAssistantConfig: (updates: Partial<Assistant>) => void;
  addComponent: (component: Component) => void;
  removeComponent: (componentId: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const useAssistantConfig = (): UseAssistantConfigReturn => {
  const { state, dispatch } = useContext(BuilderContext);

  const updateAssistantConfig = useCallback((updates: Partial<Assistant>) => {
    dispatch({ type: 'UPDATE_ASSISTANT', payload: updates });
  }, [dispatch]);

  const addComponent = useCallback((component: Component) => {
    if (state.currentAssistant) {
      const updatedComponents = [...state.currentAssistant.components, component];
      updateAssistantConfig({ components: updatedComponents });
    }
  }, [state.currentAssistant, updateAssistantConfig]);

  const removeComponent = useCallback((componentId: string) => {
    if (state.currentAssistant) {
      const updatedComponents = state.currentAssistant.components.filter(
        c => c.id !== componentId
      );
      updateAssistantConfig({ components: updatedComponents });
    }
  }, [state.currentAssistant, updateAssistantConfig]);

  return {
    assistantConfig: state.currentAssistant,
    updateAssistantConfig,
    addComponent,
    removeComponent,
    isLoading: state.isLoading,
    error: state.error
  };
};