// zeus\src\services\ApiService.ts

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Assistant, Component } from '../types/builder';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
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
          // Handle unauthorized access (e.g., redirect to login)
          console.error('Unauthorized access, redirecting to login');
          // Implement redirect logic here
        }
        return Promise.reject(error);
      }
    );
  }

  // Assistant-related API calls

  async getAssistants(): Promise<Assistant[]> {
    const response: AxiosResponse<Assistant[]> = await this.api.get('/assistants');
    return response.data;
  }

  async getAssistant(id: string): Promise<Assistant> {
    const response: AxiosResponse<Assistant> = await this.api.get(`/assistants/${id}`);
    return response.data;
  }

  async createAssistant(assistant: Assistant): Promise<Assistant> {
    const response: AxiosResponse<Assistant> = await this.api.post('/assistants', assistant);
    return response.data;
  }

  async updateAssistant(assistant: Assistant): Promise<Assistant> {
    const response: AxiosResponse<Assistant> = await this.api.put(`/assistants/${assistant.id}`, assistant);
    return response.data;
  }

  async deleteAssistant(id: string): Promise<void> {
    await this.api.delete(`/assistants/${id}`);
  }

  // Component-related API calls

  async getComponents(): Promise<Component[]> {
    const response: AxiosResponse<Component[]> = await this.api.get('/components');
    return response.data;
  }

  // Analytics API calls

  async getTotalInteractions(): Promise<number> {
    const response: AxiosResponse<{ total: number }> = await this.api.get('/analytics/interactions');
    return response.data.total;
  }

  // Add more API methods as needed for your application
}

export const apiService = new ApiService();