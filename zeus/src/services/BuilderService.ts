// zeus\src\services\BuilderService.ts

import { apiService } from './ApiService';
import { Assistant, Component } from '../types/builder';

class BuilderService {
  async getAssistant(id: string): Promise<Assistant> {
    return await apiService.getAssistant(id);
  }

  async getRecentAssistants(limit: number = 5): Promise<Assistant[]> {
    const assistants = await apiService.getAssistants();
    return assistants.slice(0, limit);
  }

  async getAssistantCount(): Promise<number> {
    const assistants = await apiService.getAssistants();
    return assistants.length;
  }

  async saveAssistant(assistant: Assistant): Promise<Assistant> {
    if (assistant.id) {
      return await apiService.updateAssistant(assistant);
    } else {
      return await apiService.createAssistant(assistant);
    }
  }

  async deleteAssistant(id: string): Promise<void> {
    await apiService.deleteAssistant(id);
  }

  async getAvailableComponents(): Promise<Component[]> {
    return await apiService.getComponents();
  }

  validateAssistant(assistant: Assistant): string[] {
    const errors: string[] = [];

    if (!assistant.name) {
      errors.push('Assistant name is required');
    }

    if (!assistant.description) {
      errors.push('Assistant description is required');
    }

    if (!assistant.modelConfig || !assistant.modelConfig.modelId) {
      errors.push('Model configuration is required');
    }

    if (assistant.components.length === 0) {
      errors.push('At least one component is required');
    }

    // Add more validation rules as needed

    return errors;
  }

  createEmptyAssistant(): Assistant {
    return {
      id: '',
      name: '',
      description: '',
      modelConfig: {
        modelId: '',
        parameters: {
          temperature: 0.7,
          maxTokens: 150,
        },
      },
      components: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export const builderService = new BuilderService();