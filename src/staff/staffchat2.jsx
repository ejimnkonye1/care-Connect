import { useState, useEffect, useRef } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { collection, addDoc, Timestamp, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase';


const Chatstaff2 = () => {
    
      const [message, setMessage] = useState('');
      const [messages, setMessages] = useState([]);
      const [loading, setLoading] = useState(false);
      const [selectedAdminId, setSelectedAdminId] = useState('');
      const [admin, setAdmin] = useState([]);
      const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);
    
      const staffId = auth.currentUser?.uid;
      const audioRef = useRef(new Audio('/path/to/notification.mp3')); // Adjust path to your audio file
    
      // Fetch parents from Firestore
      useEffect(() => {
        const fetchParents = async () => {
          const adminRef = collection(firestore, 'Admin');
          const adminSnapshot = await getDocs(adminRef);
          const adminData = adminSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(user => user.role === 'admin');
          setAdmin(adminData);
        };
    
        fetchParents();
      }, []);
    
      // Handle message fetching and sound notification
      useEffect(() => {
        if (staffId && selectedAdminId) {
          const messagesQuery = query(
            collection(firestore, 'adminmessages'),
            where('receiverId', 'in', [staffId, selectedAdminId]),
            where('senderId', 'in', [staffId, selectedAdminId])
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
      }, [staffId, selectedAdminId]);
    
      // Handle sending a message
      const handleSendMessage = async () => {
        if (!message.trim()) return;
    
        setLoading(true);
    
        try {
          await addDoc(collection(firestore, 'adminmessages'), {
            senderId: staffId,
            receiverId: selectedAdminId,
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
    return(
        <div className="grid grid-cols-12 gap-4 w-full">
        {/* Chat Area */}
        <div className="col-span-12 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
<div className="chat-container">

      <div className="p-4 border-b flex justify-between items-center text-gray-700 dark:text-neutral-200 border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900">
        <h6 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100"> Chat with Admin</h6>

      <div>
      <FormControl fullWidth>
          <InputLabel className='dark:text-neutral-100'>Select Admin</InputLabel>
          <Select
          
            value={selectedAdminId}
            onChange={(e) => setSelectedAdminId(e.target.value)}
            label="Select Parent"
          
            className='dark:text-neutral-100 w-64'
          >
            <MenuItem value='' disabled>Select Admin</MenuItem>
            {admin.map((admin) => (
              <MenuItem key={admin.id} value={admin.id}>
                {admin.name} ({admin.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
        
      </div>

      {/* Chat Messages */}
      <div className="chat-messages flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 text-gray-700 dark:bg-neutral-900 dark:text-neutral-200" style={{ height: '290px' }}>
        <ul className="message-list">
          {messages.map((msg, index) => {
            const messageDate = formatDate(msg.timestamp);
            const showDate = lastDate !== messageDate;
            lastDate = messageDate;
            return (
              <div key={index}>
                {showDate && <div className="text-center my-2 font-medium text-gray-500 dark:text-neutral-400">{messageDate}</div>}
                <li className={`message-item mb-2.5 p-2.5 rounded-lg relative w-fit min-w-[10%] max-w-[60%] flex flex-col break-words ${msg.senderId === staffId ? 'sent flex justify-end ml-auto bg-[#28a745] text-right text-white' : 'received flex justify-start bg-[#dc3545] text-left text-white'}`}>
                  <span>{msg.content}</span>
                  <small className="block mt-1 text-xs text-gray-300">{formatTime(msg.timestamp)}</small>
                </li>
              </div>
            );
          })}
        </ul>
      </div>

      {/* Chat Input */}
      <div className="chat-input p-4 border-t flex items-center space-x-2 bg-white text-gray-700 dark:bg-neutral-900 dark:border-neutral-800">
        <TextField
         InputLabelProps={{
            className:"dark:text-neutral-100",
            shrink: true, 
            
            }}
            InputProps={{
                className:"dark:text-neutral-100",
              }}
          label="Type your message..."
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={!selectedAdminId}
          className="flex-grow"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={loading || !selectedAdminId}
        >
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
    </div>
    </div>
    )

}

export default Chatstaff2;