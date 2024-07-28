import  { useState } from 'react';
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
    <div className=''>
        <div className='card chat-card'>

       
      <h6>Chat a Staff</h6>
      <ul className='"message-list'>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

      <div className="message-input">
      <TextField
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSendMessage}>Send</Button>
     </div>
     </div>
    </div>
  );
};

export default MessagingSystem;