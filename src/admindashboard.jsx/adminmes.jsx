import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';

const AdminChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Store sent messages
  const [loading, setLoading] = useState(false);
  const [broadcastTo, setBroadcastTo] = useState(''); // Initialize to empty string
  const [parents, setParents] = useState(null); // Initialize to null
  const [staffList, setStaffList] = useState(null); // Initialize to null

  const AdminId = auth.currentUser?.uid;

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

    if (broadcastTo) {
      fetchRecipients();
    }
  }, [broadcastTo]);

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
          const messageRef = collection(firestore, `${broadcastTo === 'users' ? 'users' : 'staff'}/${recipient.id}/messages`);
          const docRef = await addDoc(messageRef, messageData);
          const messageId = docRef.id;
          setMessages((prevMessages) => [...prevMessages, { id: messageId, message: messageData.message }]); // Add sent message to state
        })
      );

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
    <div>
      <h1>Admin Chat</h1>
      <select value={broadcastTo} onChange={(e) => setBroadcastTo(e.target.value)}>
        <option value="">Select recipients</option>
        <option value="users">All Parents</option>
        <option value="staff">All Staff</option>
      </select>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminChat;
