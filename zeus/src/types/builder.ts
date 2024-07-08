// zeus\src\types\builder.ts

export interface Assistant {
    id: string;
    name: string;
    description: string;
    modelConfig: ModelConfig;
    components: Component[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ModelConfig {
    modelId: string;
    parameters: {
      temperature: number;
      maxTokens: number;
      // Add other model-specific parameters as needed
    };
  }
  
  export interface Component {
    id: string;
    type: ComponentType;
    config: ComponentConfig;
  }
  
  export type ComponentType = 'RAG' | 'PromptTemplate' | 'InputProcessor' | 'AgentFileProcessor';
  
  export type ComponentConfig = RAGConfig | PromptTemplateConfig | InputProcessorConfig | AgentFileProcessorConfig;
  
  export interface RAGConfig {
    collectionName: string;
    topK: number;
  }
  
  export interface PromptTemplateConfig {
    template: string;
    variables: string[];
  }
  
  export interface InputProcessorConfig {
    allowedInputTypes: string[];
    maxHistoryLength: number;
    summarizeHistory: boolean;
  }
  
  export interface AgentFileProcessorConfig {
    supportedFileTypes: string[];
    maxFileSize: number;
  }
  
  export interface Model {
    id: string;
    name: string;
    description: string;
    maxTokens: number;
  }
  
  export interface ValidationResult {
    isValid: boolean;
    errors: string[];
  }