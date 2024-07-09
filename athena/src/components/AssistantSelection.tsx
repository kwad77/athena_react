// src/components/AssistantSelection.tsx

import React, { useEffect, useState } from 'react';
import { Assistant } from '../types/assistant';
import { assistantService} from '../services/AssistantService';

const AssistantSelection: React.FC = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const assistants = await assistantService.getAssistants();
      setAssistants(assistants);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Select an Assistant</h1>
      <ul>
        {assistants.map(assistant => (
          <li key={assistant.id}>{assistant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssistantSelection;
