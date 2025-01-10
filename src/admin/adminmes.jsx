import { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { useSelector } from 'react-redux';

const AdminChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [broadcastTo, setBroadcastTo] = useState('');
  const [parents, setParents] = useState(null);
  const [staffList, setStaffList] = useState(null);
  const AdminId = auth.currentUser?.uid;

  const darkmode = useSelector((state) => state.darkMode);

  useEffect(() => {
    const fetchRecipients = async () => {
      if (broadcastTo === 'users') {
        const parentsRef = collection(firestore, 'users');
        const parentsSnapshot = await getDocs(parentsRef);
        const parentsData = parentsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(user => user.role === 'parent');
        setParents(parentsData);
      } else if (broadcastTo === 'staff') {
        const staffRef = collection(firestore, 'staff');
        const staffSnapshot = await getDocs(staffRef);
        const staffData = staffSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStaffList(staffData);
      }
    };

    const fetchMessages = async () => {
      if (!broadcastTo) return;

      let recipients = broadcastTo === 'users' ? parents : staffList;
      if (!recipients) return;

      let fetchedMessages = [];
      await Promise.all(
        recipients.map(async (recipient) => {
          const messageRef = collection(firestore, `${broadcastTo}/${recipient.id}/messages`);
          const messageQuery = query(messageRef, orderBy('timestamp', 'asc'));
          const messageSnapshot = await getDocs(messageQuery);
          const recipientMessages = messageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          fetchedMessages = [...fetchedMessages, ...recipientMessages];
        })
      );
      setMessages(fetchedMessages);
    };

    fetchRecipients();
    fetchMessages();
  }, [broadcastTo, parents, staffList]);

  const sendMessage = async () => {
    if (message.trim() === '') {
      alert('Please enter a message.');
      return;
    }

    if (!broadcastTo) {
      alert('Please select recipients.');
      return;
    }

    setLoading(true);
    try {
      const recipients = broadcastTo === 'users' ? parents : staffList;

      if (!recipients || recipients.length === 0) {
        alert(`No ${broadcastTo === 'users' ? 'parents' : 'staff'} found.`);
        setLoading(false);
        return;
      }

      const messageData = {
        message,
        senderId: AdminId,
        timestamp: new Date().getTime(),
      };

      await Promise.all(
        recipients.map(async (recipient) => {
          const messageRef = collection(firestore, `${broadcastTo}/${recipient.id}/messages`);
          await addDoc(messageRef, messageData);
        })
      );

      setMessages((prevMessages) => [...prevMessages, { id: new Date().getTime(), message: messageData.message }]);

      setMessage('');
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chat-container ${darkmode ? 'bg-gray-800 text-neutral-300' : 'bg-white text-black'} p-4`}>
      <div className="chat-header mb-4">
        <h6 className="text-lg font-semibold">Admin Dashboard - Broadcast Message</h6>
        <FormControl fullWidth>
          <InputLabel>Select Recipients</InputLabel>
          <Select
            value={broadcastTo}
            onChange={(e) => setBroadcastTo(e.target.value)}
            label="Select Recipients"
          >
            <MenuItem value="" disabled>Select Recipients</MenuItem>
            <MenuItem value="users">All Parents</MenuItem>
            <MenuItem value="staff">All Staff</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="chat-messages mb-4">
        <ul className="message-list">
          {messages.map((msg, index) => (
            <li key={index} className={`message-item p-2 mb-2 rounded ${darkmode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <span>{msg.message}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`chat-input flex items-center space-x-2 ${darkmode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded`}>
        <TextField
          label="Type your message..."
          className={`${darkmode ? 'bg-gray-600' : 'bg-white'} text-black w-full`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={loading} className="bg-blue-500 text-white hover:bg-blue-600 rounded">
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  );
};

export default AdminChat;
