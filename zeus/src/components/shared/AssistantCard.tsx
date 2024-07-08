// zeus\src\components\shared\AssistantCard.tsx

import React from 'react';
import { Assistant } from '../../types/builder';

interface AssistantCardProps {
  assistant: Assistant;
  onEdit?: (assistant: Assistant) => void;
  onDelete?: (assistantId: string) => void;
}

const AssistantCard: React.FC<AssistantCardProps> = ({
  assistant,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="assistant-card">
      <h3>{assistant.name}</h3>
      <p>{assistant.description}</p>
      <div className="assistant-details">
        <span>Model: {assistant.modelConfig.modelId}</span>
        <span>Components: {assistant.components.length}</span>
      </div>
      <div className="assistant-actions">
        {onEdit && (
          <button
            onClick={() => onEdit(assistant)}
            className="edit-button"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(assistant.id)}
            className="delete-button"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AssistantCard;