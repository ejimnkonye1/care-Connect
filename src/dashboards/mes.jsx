import { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { collection, addDoc, Timestamp, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import aud from '../audio/mixkit.wav';
import { useSelector } from 'react-redux';

const MessagingSystem = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [staffId, setStaffId] = useState(''); // Set this to the specific staff member's ID you want to chat with
  const [staffList, setStaffList] = useState([]); // Store the list of staff members

  const parentId = auth.currentUser?.uid; // Using Firebase auth UID as parentId

  // Fetch staff members from Firestore
  useEffect(() => {
    const fetchStaff = async () => {
      const staffRef = collection(firestore, 'staff');
      const staffSnapshot = await getDocs(staffRef);
      const staffData = staffSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStaffList(staffData);
    };

    fetchStaff();
  }, []);

  // Fetch messages between parent and selected staff member
  useEffect(() => {
    if (parentId && staffId) {
      const messagesQuery = query(
        collection(firestore, 'messages'),
        where('receiverId', 'in', [parentId, staffId]),
        where('senderId', 'in', [parentId, staffId])
      );

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => doc.data());
        const sortedMessages = newMessages.sort((a, b) => a.timestamp - b.timestamp);

        // Check if there are new messages
        if (messages.length < sortedMessages.length) {
          // Play sound for new messages
          const audio = new Audio(aud); // Adjust the path as needed
          audio.play();
        }

        setMessages(sortedMessages);
      });

      return unsubscribe;
    }
  }, [parentId, staffId, messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!message.trim() || !staffId) return;

    setLoading(true);

    try {
      await addDoc(collection(firestore, 'messages'), {
        senderId: parentId,
        receiverId: staffId,
        content: message,
        timestamp: Timestamp.now(),
        read: false,
      });
      setMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
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
    <div className='row'>
      <div className='col-md-2'>
        <FormControl fullWidth>
          <InputLabel>Select Staff</InputLabel>
          <Select
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            label="Select Staff"
          >
            {staffList.map((staff) => (
              <MenuItem key={staff.id} value={staff.id}
               className={`${darkmode ? 'card-color':''}`}
              >
                {staff.name} ({staff.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className='col-md-10'>
        <div className={`chat-container ${darkmode ? 'card-mode':''}`}>
          <div className='chat-header'>
            <h6>Chat with Staff</h6>
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
                        msg.senderId === parentId ? 'sent' : 'received'
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
          <div className={`chat-input ${darkmode ? 'card-mode':''}`}>
            <TextField
              label='Type your message...'
              className={`${darkmode? 'card-color':''}`}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={!staffId}
            />
            <Button onClick={handleSendMessage} disabled={loading || !staffId}>
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;
