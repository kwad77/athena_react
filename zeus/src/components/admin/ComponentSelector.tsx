// zeus\src\components\admin\ComponentSelector.tsx

import React, { useState } from 'react';
import { Component } from '../../types/builder';

interface ComponentSelectorProps {
  availableComponents: Component[];
  onComponentSelect: (component: Component) => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  availableComponents,
  onComponentSelect,
}) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('');

  const handleComponentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponentId(event.target.value);
  };

  const handleAddComponent = () => {
    const selectedComponent = availableComponents.find(
      (component) => component.id === selectedComponentId
    );
    if (selectedComponent) {
      onComponentSelect(selectedComponent);
      setSelectedComponentId('');
    }
  };

  return (
    <div className="component-selector">
      <h3>Add Component</h3>
      <select
        value={selectedComponentId}
        onChange={handleComponentChange}
        className="component-select"
      >
        <option value="">Select a component</option>
        {availableComponents.map((component) => (
          <option key={component.id} value={component.id}>
            {component.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddComponent}
        disabled={!selectedComponentId}
        className="add-component-button"
      >
        Add Component
      </button>
    </div>
  );
};

export default ComponentSelector;