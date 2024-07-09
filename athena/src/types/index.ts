export type Capability = 'text-generation' | 'image-analysis' | 'voice-recognition' | 'data-analysis' | 'code-generation';

export interface Assistant {
  id: string;
  name: string;
  description: string;
  model: string;
  capabilities: Capability[];
  config: {
    maxTokens: number;
    temperature: number;
    // Add other config properties as needed
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  conversationId: string;
}

// Add other type definitions as needed