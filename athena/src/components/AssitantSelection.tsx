// src/components/AssistantSelection.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Assistant } from '../types';
import { fetchAvailableAssistants } from '../services/AssistantService';

const AssistantSelection: React.FC = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssistants = async () => {
      try {
        setIsLoading(true);
        const availableAssistants = await fetchAvailableAssistants();
        setAssistants(availableAssistants);
      } catch (err) {
        setError('Failed to load assistants. Please try again later.');
        console.error('Error loading assistants:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssistants();
  }, []);

  if (isLoading) return <div>Loading assistants...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="assistant-selection">
      <h1>Choose an Assistant</h1>
      <ul>
        {assistants.map(assistant => (
          <li key={assistant.id}>
            <Link to={`/chat/${assistant.id}`}>{assistant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssistantSelection;