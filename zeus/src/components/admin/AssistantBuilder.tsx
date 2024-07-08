// zeus\src\components\admin\AssistantBuilder.tsx

import React, { useState, useEffect } from 'react';
import { useAssistantConfig } from '../../hooks/useAssistantConfig';
import { BuilderService } from '../../services/BuilderService';
import ComponentLibrary from './ComponentLibrary';
import { Assistant, Component } from '../../types/builder';

const AssistantBuilder: React.FC = () => {
  const { assistantConfig, updateAssistantConfig } = useAssistantConfig();
  const [availableComponents, setAvailableComponents] = useState<Component[]>([]);

  useEffect(() => {
    const fetchComponents = async () => {
      const components = await BuilderService.getAvailableComponents();
      setAvailableComponents(components);
    };
    fetchComponents();
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateAssistantConfig({ ...assistantConfig, name: event.target.value });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateAssistantConfig({ ...assistantConfig, description: event.target.value });
  };

  const handleComponentAdd = (component: Component) => {
    updateAssistantConfig({
      ...assistantConfig,
      components: [...assistantConfig.components, component],
    });
  };

  const handleComponentRemove = (componentId: string) => {
    updateAssistantConfig({
      ...assistantConfig,
      components: assistantConfig.components.filter(c => c.id !== componentId),
    });
  };

  const handleSave = async () => {
    try {
      await BuilderService.saveAssistant(assistantConfig);
      alert('Assistant saved successfully!');
    } catch (error) {
      console.error('Error saving assistant:', error);
      alert('Failed to save assistant. Please try again.');
    }
  };

  return (
    <div className="assistant-builder">
      <h1>Assistant Builder</h1>
      <div>
        <label htmlFor="assistant-name">Name:</label>
        <input
          id="assistant-name"
          type="text"
          value={assistantConfig.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="assistant-description">Description:</label>
        <textarea
          id="assistant-description"
          value={assistantConfig.description}
          onChange={handleDescriptionChange}
        />
      </div>
      <ComponentLibrary
        availableComponents={availableComponents}
        onComponentAdd={handleComponentAdd}
      />
      <div>
        <h2>Selected Components:</h2>
        {assistantConfig.components.map((component) => (
          <div key={component.id}>
            {component.name}
            <button onClick={() => handleComponentRemove(component.id)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save Assistant</button>
    </div>
  );
};

export default AssistantBuilder;