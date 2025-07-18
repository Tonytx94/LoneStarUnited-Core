
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

export default function RoyceChatApp() {
  const [messages, setMessages] = useState([
    { from: 'royce', text: 'Hello! I am Royce. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    setMessages(prev => [...prev, { from: 'user', text }]);
    setLoading(true);
    try {
      const res = await fetch('/api/royce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { from: 'royce', text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { from: 'royce', text: 'Sorry, I could not get a response.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="royce-chat-app">
      <ChatWindow messages={messages} />
      <ChatInput onSend={handleSend} />
      {loading && <div style={{textAlign:'center',margin:'10px'}}>Royce is thinking...</div>}
    </div>
  );
}
