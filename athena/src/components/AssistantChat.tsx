import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { useAssistant } from '../hooks/useAssistant';
import { Message } from '../types';
import '../styles/chat.css';

const AssistantChat: React.FC = () => {
  const { assistantId } = useParams<{ assistantId: string }>();
  const { sendMessage, loadAssistant } = useAssistant();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');

  useEffect(() => {
    if (assistantId) {
      loadAssistant(assistantId);
      // Generate a new conversation ID or fetch an existing one
      setConversationId(Date.now().toString());
    }
  }, [assistantId, loadAssistant]);

  const handleSendMessage = async (text: string) => {
    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date(),
      conversationId: conversationId
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const response = await sendMessage(text);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
        conversationId: conversationId
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="assistant-chat">
      <h2>Chat with Assistant {assistantId}</h2>
      <MessageList messages={messages} />
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default AssistantChat;