import { useState, useEffect, useRef } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { collection, addDoc, Timestamp, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { useSelector } from 'react-redux';

const StaffChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState('');
  const [parents, setParents] = useState([]);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);

  const staffId = auth.currentUser?.uid;
  const audioRef = useRef(new Audio('/path/to/notification.mp3')); // Adjust path to your audio file

  // Fetch parents from Firestore
  useEffect(() => {
    const fetchParents = async () => {
      const parentsRef = collection(firestore, 'users');
      const parentsSnapshot = await getDocs(parentsRef);
      const parentsData = parentsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === 'parent');
      setParents(parentsData);
    };

    fetchParents();
  }, []);

  // Handle message fetching and sound notification
  useEffect(() => {
    if (staffId && selectedParentId) {
      const messagesQuery = query(
        collection(firestore, 'messages'),
        where('receiverId', 'in', [staffId, selectedParentId]),
        where('senderId', 'in', [staffId, selectedParentId])
      );

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => doc.data());
        const sortedMessages = newMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(sortedMessages);

        // Check if the latest message is newer than the last timestamp
        if (sortedMessages.length > 0) {
          const latestTimestamp = sortedMessages[sortedMessages.length - 1].timestamp;
          if (!lastMessageTimestamp || latestTimestamp.toMillis() > lastMessageTimestamp.toMillis()) {
            audioRef.current.play(); // Play the notification sound
            setLastMessageTimestamp(latestTimestamp);
          }
        }
      });

      return () => {
        unsubscribe();
        // Reset lastMessageTimestamp when changing parent
        setLastMessageTimestamp(null);
      };
    }
  }, [staffId, selectedParentId]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      await addDoc(collection(firestore, 'messages'), {
        senderId: staffId,
        receiverId: selectedParentId,
        content: message,
        timestamp: Timestamp.now(),
        read: false,
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (timestamp) => {
    const time = timestamp.toDate();
    return time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  let lastDate = null;
  const darkmode = useSelector((state)=> state.darkMode)
  return (
    <div className={`chat-container ${darkmode ? 'card-mode':''}`}>
      <div className='chat-header'>
        <h6>Staff Dashboard - Chat with Parents</h6>
        <FormControl fullWidth>
          <InputLabel>Select Parent</InputLabel>
          <Select
            value={selectedParentId}
            onChange={(e) => setSelectedParentId(e.target.value)}
            label="Select Parent"
          >
            <MenuItem value='' disabled>Select a Parent</MenuItem>
            {parents.map((parent) => (
              <MenuItem key={parent.id} value={parent.id}>
                {parent.name} ({parent.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className='chat-messages'>
        <ul className='message-list'>
          {messages.map((msg, index) => {
            const messageDate = formatDate(msg.timestamp);
            const showDate = lastDate !== messageDate;
            lastDate = messageDate;
            return (
              <div key={index}>
                    {showDate && <div className={`date-divider ${darkmode? 'card-color':''}`}>{messageDate}</div>}
                <li
                  className={`message-item ${
                    msg.senderId === staffId ? 'sent' : 'received'
                  }`}
                >
                  <span>{msg.content}</span>
                  <small>{formatTime(msg.timestamp)}</small>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
      <div className={`chat-input ${darkmode ? 'card-mode card-color':''}`}>
        <TextField
          label='Type your message...'
          className={`${darkmode? 'card-color':''}`}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  );
};

export default StaffChat;
