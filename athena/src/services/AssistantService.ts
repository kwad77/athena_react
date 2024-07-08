import { apiService } from './ApiService';
import { AssistantModel } from '../models/AssistantModel';
import { Message } from '../types';

class AssistantService {
  private assistants: AssistantModel[] = [];

  async getAssistants(): Promise<AssistantModel[]> {
    if (this.assistants.length === 0) {
      this.assistants = await apiService.getAssistants();
    }
    return this.assistants;
  }

  async getAssistantById(id: string): Promise<AssistantModel | undefined> {
    const assistants = await this.getAssistants();
    return assistants.find(assistant => assistant.id === id);
  }

  async createAssistant(config: AssistantModel): Promise<AssistantModel> {
    const newAssistant = await apiService.createAssistant(config);
    this.assistants.push(newAssistant);
    return newAssistant;
  }

  async updateAssistant(assistant: AssistantModel): Promise<AssistantModel> {
    const updatedAssistant = await apiService.updateAssistant(assistant);
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

  async interactWithAssistant(assistantId: string, message: string): Promise<{ userMessage: Message, assistantMessage: Message }> {
    const assistant = await this.getAssistantById(assistantId);
    if (!assistant) {
      throw new Error('Assistant not found');
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    const responseContent = await this.generateResponse(assistantId, message);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: responseContent,
      sender: 'assistant',
      timestamp: new Date()
    };

    return { userMessage, assistantMessage };
  }

  clearCache(): void {
    this.assistants = [];
  }
}

export const assistantService = new AssistantService();