import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import InputArea from './InputArea';
import ResponseDisplay from './ResponseDisplay';
import { useAssistant } from '../hooks/useAssistant';
import { Message } from '../types';

const AssistantInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { sendMessage, assistantResponse, isLoading } = useAssistant();

  useEffect(() => {
    if (assistantResponse) {
      setMessages(prevMessages => [...prevMessages, {
        id: Date.now().toString(),
        text: assistantResponse,
        sender: 'assistant',
        timestamp: new Date()
      }]);
    }
  }, [assistantResponse]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    sendMessage(text);
  };

  return (
    <div className="assistant-interface">
      <MessageList messages={messages} />
      <ResponseDisplay isLoading={isLoading} />
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default AssistantInterface;