import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const MessagingSystem = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    // Call API to send message
    setMessages([...messages, message]);
    setMessage('');
  };

  return (
    <div>
      <h1>Messaging System</h1>
      <TextField
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSendMessage}>Send</Button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessagingSystem;