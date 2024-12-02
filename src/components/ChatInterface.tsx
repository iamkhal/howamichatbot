import React, { useState, useEffect } from 'react';
import { Message, UserRole } from '../types';
import { Send, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';
import { getChatResponse } from '../lib/openai';

interface ChatInterfaceProps {
  role: UserRole;
  onBack: () => void;
}

export function ChatInterface({ role, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Send initial message with Google Form link
    const sendInitialMessage = async () => {
      setIsLoading(true);
      try {
        const initialResponse = await getChatResponse('', role, true);
        const botMessage: Message = {
          id: Date.now().toString(),
          content: initialResponse,
          sender: 'bot',
          timestamp: new Date(),
          role,
        };
        setMessages([botMessage]);
      } catch (error) {
        console.error('Failed to get initial message:', error);
      } finally {
        setIsLoading(false);
      }
    };

    sendInitialMessage();
  }, [role]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      role,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getChatResponse(input, role);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse || 'Sorry, I could not process your request.',
        sender: 'bot',
        timestamp: new Date(),
        role,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b p-4 flex items-center">
        <button
          onClick={onBack}
          className="mr-4 hover:bg-gray-100 p-2 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Logo />
        <h1 className="text-xl font-semibold ml-4">
          {role === 'teen' ? 'Teen Chat' : 'Parent Chat'}
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-[#CCFF00] text-gray-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content.includes('[Google Form Link]') ? (
                <div dangerouslySetInnerHTML={{
                  __html: message.content.replace(
                    /\[Google Form Link\]\((.*?)\)/,
                    '<a href="$1" target="_blank" class="text-[#FFA500] hover:underline">Google Form Link</a>'
                  )
                }} />
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className={`p-2 rounded-lg ${
              isLoading
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-[#CCFF00] hover:bg-[#CCFF00]/90'
            }`}
            disabled={isLoading}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Disclaimer: This chatbot provides general information only. Please consult a healthcare professional for medical advice.
        </p>
      </div>
    </div>
  );
}