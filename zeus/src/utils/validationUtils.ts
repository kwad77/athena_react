// zeus\src\utils\validationUtils.ts

import { Assistant, Component, ModelConfig } from '../types/builder';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  return errors;
};

export const validateAssistantName = (name: string): string | null => {
  if (name.trim().length === 0) {
    return 'Assistant name cannot be empty';
  }
  if (name.length > 50) {
    return 'Assistant name must be 50 characters or less';
  }
  return null;
};

export const validateModelConfig = (config: ModelConfig): string[] => {
  const errors: string[] = [];
  if (!config.modelId) {
    errors.push('Model ID is required');
  }
  if (config.parameters.temperature < 0 || config.parameters.temperature > 1) {
    errors.push('Temperature must be between 0 and 1');
  }
  if (config.parameters.maxTokens < 1) {
    errors.push('Max tokens must be at least 1');
  }
  return errors;
};

export const validateComponent = (component: Component): string[] => {
  const errors: string[] = [];
  if (!component.type) {
    errors.push('Component type is required');
  }
  // Add specific validation for each component type
  switch (component.type) {
    case 'RAG':
      if (!component.config.collectionName) {
        errors.push('Collection name is required for RAG component');
      }
      break;
    case 'PromptTemplate':
      if (!component.config.template) {
        errors.push('Template is required for Prompt Template component');
      }
      break;
    // Add cases for other component types
  }
  return errors;
};

export const validateAssistant = (assistant: Assistant): string[] => {
  let errors: string[] = [];
  
  const nameError = validateAssistantName(assistant.name);
  if (nameError) errors.push(nameError);
  
  errors = errors.concat(validateModelConfig(assistant.modelConfig));
  
  if (assistant.components.length === 0) {
    errors.push('Assistant must have at least one component');
  } else {
    assistant.components.forEach((component, index) => {
      const componentErrors = validateComponent(component);
      errors = errors.concat(componentErrors.map(error => `Component ${index + 1}: ${error}`));
    });
  }
  
  return errors;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateApiKey = (apiKey: string): boolean => {
  // This is a simple check. Adjust based on your API key format.
  return apiKey.length >= 32 && apiKey.length <= 64;
};