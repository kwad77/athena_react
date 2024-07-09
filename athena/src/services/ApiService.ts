import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AssistantModel } from '../models/AssistantModel';
import { Message } from '../types/assistant';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access, redirecting to login');
          // Implement redirect logic here
        }
        return Promise.reject(error);
      }
    );
  }

  // Assistant-related API calls

  async getAssistants(): Promise<AssistantModel[]> {
    const response: AxiosResponse<AssistantModel[]> = await this.api.get('/assistants');
    return response.data.map(assistant => AssistantModel.fromJSON(assistant));
  }

  async createAssistant(assistant: AssistantModel): Promise<AssistantModel> {
    const response: AxiosResponse<AssistantModel> = await this.api.post('/assistants', assistant.toJSON());
    return AssistantModel.fromJSON(response.data);
  }

  async updateAssistant(assistant: AssistantModel): Promise<AssistantModel> {
    const response: AxiosResponse<AssistantModel> = await this.api.put(`/assistants/${assistant.id}`, assistant.toJSON());
    return AssistantModel.fromJSON(response.data);
  }

  async deleteAssistant(assistantId: string): Promise<void> {
    await this.api.delete(`/assistants/${assistantId}`);
  }

  // Conversation-related API calls

  async getConversations(assistantId: string): Promise<string[]> {
    const response: AxiosResponse<string[]> = await this.api.get(`/assistants/${assistantId}/conversations`);
    return response.data;
  }

  async getConversationHistory(conversationId: string): Promise<Message[]> {
    const response: AxiosResponse<Message[]> = await this.api.get(`/conversations/${conversationId}`);
    return response.data;
  }

  async sendMessage(conversationId: string, message: Message): Promise<Message> {
    const response: AxiosResponse<Message> = await this.api.post(`/conversations/${conversationId}/messages`, message);
    return response.data;
  }

  // AI interaction API calls

  async generateResponse(assistantId: string, message: string): Promise<string> {
    const response: AxiosResponse<{ response: string }> = await this.api.post(`/assistants/${assistantId}/generate`, { message });
    return response.data.response;
  }

  // Add more API methods as needed for your application
}

export const apiService = new ApiService();
