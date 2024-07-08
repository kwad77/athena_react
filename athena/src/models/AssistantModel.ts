import { v4 as uuidv4 } from 'uuid';

export interface AssistantConfig {
  name: string;
  description?: string;
  model: string;
  capabilities: string[];
  parameters: Record<string, any>;
}

export class AssistantModel {
  readonly id: string;
  name: string;
  description: string;
  model: string;
  capabilities: string[];
  parameters: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;

  constructor(config: AssistantConfig) {
    this.id = uuidv4();
    this.name = config.name;
    this.description = config.description || '';
    this.model = config.model;
    this.capabilities = config.capabilities;
    this.parameters = config.parameters;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateConfig(newConfig: Partial<AssistantConfig>): void {
    if (newConfig.name) this.name = newConfig.name;
    if (newConfig.description) this.description = newConfig.description;
    if (newConfig.model) this.model = newConfig.model;
    if (newConfig.capabilities) this.capabilities = newConfig.capabilities;
    if (newConfig.parameters) this.parameters = { ...this.parameters, ...newConfig.parameters };
    this.updatedAt = new Date();
  }

  addCapability(capability: string): void {
    if (!this.capabilities.includes(capability)) {
      this.capabilities.push(capability);
      this.updatedAt = new Date();
    }
  }

  removeCapability(capability: string): void {
    this.capabilities = this.capabilities.filter(cap => cap !== capability);
    this.updatedAt = new Date();
  }

  setParameter(key: string, value: any): void {
    this.parameters[key] = value;
    this.updatedAt = new Date();
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      model: this.model,
      capabilities: this.capabilities,
      parameters: this.parameters,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  static fromJSON(json: Record<string, any>): AssistantModel {
    const assistant = new AssistantModel({
      name: json.name,
      description: json.description,
      model: json.model,
      capabilities: json.capabilities,
      parameters: json.parameters,
    });
    assistant.id = json.id;
    assistant.createdAt = new Date(json.createdAt);
    assistant.updatedAt = new Date(json.updatedAt);
    return assistant;
  }
}