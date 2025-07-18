import React from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} from={msg.from} text={msg.text} />
      ))}
    </div>
  );
}
