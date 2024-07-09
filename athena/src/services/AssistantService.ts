import { apiService } from './ApiService';
import { AssistantModel } from '../models/AssistantModel';
import { Message, Assistant, Capability, CreateAssistantPayload, UpdateAssistantPayload, AssistantConfig } from '../types/assistant';

class AssistantService {
  private assistants: Assistant[] = [];

  async getAssistants(): Promise<Assistant[]> {
    if (this.assistants.length === 0) {
      const assistantModels = await apiService.getAssistants();
      this.assistants = assistantModels.map(model => this.convertToAssistant(model));
    }
    return this.assistants;
  }

  async getAssistantById(id: string): Promise<Assistant | undefined> {
    if (this.assistants.length === 0) {
      await this.getAssistants();
    }
    return this.assistants.find(assistant => assistant.id === id);
  }

  private convertToAssistant(model: AssistantModel): Assistant {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      capabilities: model.capabilities as Capability[],
      config: {
        model: model.model,
        temperature: model.parameters.temperature,
        maxTokens: model.parameters.maxTokens,
        topP: model.parameters.topP,
        frequencyPenalty: model.parameters.frequencyPenalty,
        presencePenalty: model.parameters.presencePenalty,
      },
      isActive: model.parameters.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  private convertToAssistantModel(assistant: Assistant): AssistantModel {
    return new AssistantModel({
      name: assistant.name,
      description: assistant.description,
      model: assistant.config.model,
      capabilities: assistant.capabilities,
      parameters: {
        temperature: assistant.config.temperature,
        maxTokens: assistant.config.maxTokens,
        topP: assistant.config.topP,
        frequencyPenalty: assistant.config.frequencyPenalty,
        presencePenalty: assistant.config.presencePenalty,
        isActive: assistant.isActive,
      },
    });
  }

  async createAssistant(config: CreateAssistantPayload): Promise<Assistant> {
    const newAssistantModel = new AssistantModel({
      name: config.name,
      description: config.description,
      model: config.config.model,
      capabilities: config.capabilities,
      parameters: {
        temperature: config.config.temperature,
        maxTokens: config.config.maxTokens,
        topP: config.config.topP,
        frequencyPenalty: config.config.frequencyPenalty,
        presencePenalty: config.config.presencePenalty,
        isActive: config.isActive,
      }
    });
    const createdAssistantModel = await apiService.createAssistant(newAssistantModel);
    const newAssistant = this.convertToAssistant(createdAssistantModel);
    this.assistants.push(newAssistant);
    return newAssistant;
  }

  async updateAssistant(assistant: UpdateAssistantPayload): Promise<Assistant> {
    const assistantModel = this.convertToAssistantModel(assistant as Assistant);
    const updatedAssistantModel = await apiService.updateAssistant(assistantModel);
    const updatedAssistant = this.convertToAssistant(updatedAssistantModel);
    const index = this.assistants.findIndex(a => a.id === updatedAssistant.id);
    if (index !== -1) {
      this.assistants[index] = updatedAssistant;
    }
    return updatedAssistant;
  }

  async deleteAssistant(id: string): Promise<void> {
    await apiService.deleteAssistant(id);
    this.assistants = this.assistants.filter(assistant => assistant.id !== id);
  }

  async getConversations(assistantId: string): Promise<string[]> {
    return await apiService.getConversations(assistantId);
  }

  async getConversationHistory(conversationId: string): Promise<Message[]> {
    return await apiService.getConversationHistory(conversationId);
  }

  async sendMessage(conversationId: string, message: Message): Promise<Message> {
    return await apiService.sendMessage(conversationId, message);
  }

  async generateResponse(assistantId: string, message: string): Promise<string> {
    return await apiService.generateResponse(assistantId, message);
  }

  async interactWithAssistant(assistantId: string, message: string, conversationId: string): Promise<{ userMessage: Message, assistantMessage: Message }> {
    const assistant = await this.getAssistantById(assistantId);
    if (!assistant) {
      throw new Error('Assistant not found');
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      conversationId: conversationId
    };

    const responseContent = await this.generateResponse(assistantId, message);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: responseContent,
      sender: 'assistant',
      timestamp: new Date(),
      conversationId: conversationId
    };

    return { userMessage, assistantMessage };
  }

  clearCache(): void {
    this.assistants = [];
  }
}

export const assistantService = new AssistantService();

export const fetchAvailableAssistants = async (): Promise<Assistant[]> => {
  return assistantService.getAssistants();
};
