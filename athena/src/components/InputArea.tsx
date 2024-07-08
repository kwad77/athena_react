import './InputArea.css';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-area">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type your message here..."
        disabled={isLoading}
        aria-label="Message input"
      />
      <button 
        type="submit" 
        disabled={isLoading || !inputText.trim()}
        aria-label="Send message"
      >
        Send
      </button>
    </form>
  );
};

export default InputArea;