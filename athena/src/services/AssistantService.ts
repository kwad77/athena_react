import { v4 as uuidv4 } from 'uuid';
import { Assistant, CreateAssistantPayload, UpdateAssistantPayload } from '../types/assistant';
import { apiService } from './ApiService';

class AssistantService {
  private assistants: Assistant[] = [];

  constructor() {
    // Initialize with some dummy data or fetch from API
    this.loadAssistants();
  }

  private async loadAssistants() {
    try {
      const assistantData = await apiService.getAssistants();
      this.assistants = assistantData.map(this.convertToAssistant);
    } catch (error) {
      console.error('Error loading assistants:', error);
      // Initialize with empty array if load fails
      this.assistants = [];
    }
  }

  private convertToAssistant(data: any): Assistant {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      capabilities: data.capabilities || [],
      config: {
        model: data.config?.model || '',
        temperature: data.config?.temperature || 0.7,
        maxTokens: data.config?.maxTokens || 150,
        topP: data.config?.topP || 1,
        frequencyPenalty: data.config?.frequencyPenalty || 0,
        presencePenalty: data.config?.presencePenalty || 0,
      },
      isActive: data.isActive || true,
      createdAt: new Date(data.createdAt || Date.now()),
      updatedAt: new Date(data.updatedAt || Date.now())
    };
  }

  async getAssistants(): Promise<Assistant[]> {
    return this.assistants;
  }

  async getAssistantById(id: string): Promise<Assistant | undefined> {
    return this.assistants.find(assistant => assistant.id === id);
  }

  async createAssistant(payload: CreateAssistantPayload): Promise<Assistant> {
    const newAssistant: Assistant = {
      ...payload,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      // Simulate API call
      await this.simulateApiCall();
      this.assistants.push(newAssistant);
      return newAssistant;
    } catch (error) {
      console.error('Error creating assistant:', error);
      throw error;
    }
  }

  async updateAssistant(id: string, payload: UpdateAssistantPayload): Promise<Assistant> {
    const index = this.assistants.findIndex(assistant => assistant.id === id);
    if (index === -1) {
      throw new Error('Assistant not found');
    }

    const updatedAssistant: Assistant = {
      ...this.assistants[index],
      ...payload,
      updatedAt: new Date()
    };

    try {
      // Simulate API call
      await this.simulateApiCall();
      this.assistants[index] = updatedAssistant;
      return updatedAssistant;
    } catch (error) {
      console.error('Error updating assistant:', error);
      throw error;
    }
  }

  async deleteAssistant(id: string): Promise<void> {
    const index = this.assistants.findIndex(assistant => assistant.id === id);
    if (index === -1) {
      throw new Error('Assistant not found');
    }

    try {
      // Simulate API call
      await this.simulateApiCall();
      this.assistants.splice(index, 1);
    } catch (error) {
      console.error('Error deleting assistant:', error);
      throw error;
    }
  }

  // Simulate an API call with a delay
  private simulateApiCall(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  // Method to clear all assistants (for testing purposes)
  clearAssistants(): void {
    this.assistants = [];
  }
}

export const assistantService = new AssistantService();