// src/components/AssistantChat.tsx

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessageList from './MessageList';
import InputArea from './InputArea';
import ResponseDisplay from './ResponseDisplay';
import { useAssistant } from '../hooks/useAssistant';

interface RouteParams {
  assistantId: string;
}

const AssistantChat: React.FC = () => {
  const { assistantId } = useParams<RouteParams>();
  const { messages, isLoading, error, sendMessage, loadAssistant } = useAssistant();

  useEffect(() => {
    if (assistantId) {
      loadAssistant(assistantId);
    }
  }, [assistantId, loadAssistant]);

  const handleSendMessage = (text: string) => {
    sendMessage(text);
  };

  if (isLoading) return <div>Loading chat...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="assistant-chat">
      <h2>Chat with Assistant {assistantId}</h2>
      <MessageList messages={messages} />
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
      <ResponseDisplay isLoading={isLoading} />
    </div>
  );
};

export default AssistantChat;