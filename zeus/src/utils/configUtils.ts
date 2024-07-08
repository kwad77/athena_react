// zeus\src\utils\configUtils.ts

import { Assistant, Component, ComponentType, ComponentConfig, ModelConfig } from '../types/builder';

export const createEmptyAssistant = (): Assistant => ({
  id: '',
  name: '',
  description: '',
  modelConfig: createDefaultModelConfig(),
  components: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const createDefaultModelConfig = (): ModelConfig => ({
  modelId: '',
  parameters: {
    temperature: 0.7,
    maxTokens: 150,
  },
});

export const createEmptyComponent = (type: ComponentType): Component => ({
  id: '',
  type,
  config: createEmptyComponentConfig(type),
});

export const createEmptyComponentConfig = (type: ComponentType): ComponentConfig => {
  switch (type) {
    case 'RAG':
      return { collectionName: '', topK: 3 };
    case 'PromptTemplate':
      return { template: '', variables: [] };
    case 'InputProcessor':
      return { allowedInputTypes: [], maxHistoryLength: 10, summarizeHistory: false };
    case 'AgentFileProcessor':
      return { supportedFileTypes: [], maxFileSize: 5 * 1024 * 1024 }; // 5MB default
    default:
      throw new Error(`Unsupported component type: ${type}`);
  }
};

export const validateAssistantConfig = (assistant: Assistant): string[] => {
  const errors: string[] = [];

  if (!assistant.name.trim()) {
    errors.push('Assistant name is required');
  }

  if (!assistant.modelConfig.modelId) {
    errors.push('Model selection is required');
  }

  if (assistant.components.length === 0) {
    errors.push('At least one component is required');
  }

  // Add more validation rules as needed

  return errors;
};

export const cloneAssistant = (assistant: Assistant): Assistant => ({
  ...assistant,
  id: '', // Reset ID for the clone
  name: `${assistant.name} (Copy)`,
  components: assistant.components.map(cloneComponent),
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const cloneComponent = (component: Component): Component => ({
  ...component,
  id: '', // Reset ID for the clone
  config: { ...component.config },
});

export const updateComponentConfig = (
  component: Component,
  updates: Partial<ComponentConfig>
): Component => ({
  ...component,
  config: { ...component.config, ...updates },
});

export const getComponentTypeLabel = (type: ComponentType): string => {
  switch (type) {
    case 'RAG':
      return 'Retrieval-Augmented Generation';
    case 'PromptTemplate':
      return 'Prompt Template';
    case 'InputProcessor':
      return 'Input Processor';
    case 'AgentFileProcessor':
      return 'Agent File Processor';
    default:
      return type;
  }
};