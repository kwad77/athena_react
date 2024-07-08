// Export all types from assistant.ts
export * from './assistant';

// General types used across the application

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLogin?: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  conversationId: string;
}

export interface Conversation {
  id: string;
  title: string;
  assistantId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type SortOrder = 'asc' | 'desc';

export interface SortParams {
  field: string;
  order: SortOrder;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}

export type Theme = 'light' | 'dark';

export interface AppSettings {
  theme: Theme;
  notifications: boolean;
  language: string;
}

export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ErrorState {
  message: string;
  code?: string;
}