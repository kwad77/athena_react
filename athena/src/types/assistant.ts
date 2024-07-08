// Basic assistant information
export interface AssistantInfo {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Assistant capabilities
  export type Capability = 'text-generation' | 'image-analysis' | 'voice-recognition' | 'data-analysis' | 'code-generation';
  
  // Assistant configuration
  export interface AssistantConfig {
    model: string;
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  }
  
  // Full assistant type
  export interface Assistant extends AssistantInfo {
    capabilities: Capability[];
    config: AssistantConfig;
    isActive: boolean;
  }
  
  // Assistant creation payload
  export type CreateAssistantPayload = Omit<Assistant, 'id' | 'createdAt' | 'updatedAt'>;
  
  // Assistant update payload
  export type UpdateAssistantPayload = Partial<Omit<Assistant, 'id' | 'createdAt' | 'updatedAt'>>;
  
  // Assistant interaction types
  export interface AssistantInteraction {
    assistantId: string;
    input: string;
    output: string;
    timestamp: Date;
  }
  
  // Assistant performance metrics
  export interface AssistantMetrics {
    assistantId: string;
    averageResponseTime: number;
    totalInteractions: number;
    userSatisfactionScore: number;
  }
  
  // Assistant status
  export type AssistantStatus = 'idle' | 'processing' | 'error';
  
  // Assistant error
  export interface AssistantError {
    code: string;
    message: string;
    details?: any;
  }
  
  // Assistant response
  export interface AssistantResponse {
    content: string;
    status: AssistantStatus;
    error?: AssistantError;
  }
  
  // Assistant function - for more complex assistants that can perform specific functions
  export interface AssistantFunction {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  }
  
  // Assistant with functions
  export interface AdvancedAssistant extends Assistant {
    functions: AssistantFunction[];
  }