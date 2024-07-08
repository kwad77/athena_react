import './ResponseDisplay.css';
import React from 'react';

interface ResponseDisplayProps {
  isLoading: boolean;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="response-display" aria-live="polite">
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="sr-only">AI is thinking...</p>
    </div>
  );
};

export default ResponseDisplay;