import { useState, useEffect } from 'react';

import { collection, addDoc, Timestamp, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import aud from '../audio/mixkit.wav';
import { MenuItem,Select,FormControl,InputLabel, TextField, Button } from '@mui/material';

const ParentChat2 = () => {
   const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAdminId, setSelectedAdminId] = useState('');
    const [admin, setAdmin] = useState([]);
    const [previousMessagesCount, setPreviousMessagesCount] = useState(0);
    const parentId = auth.currentUser?.uid; // Using Firebase auth UID as parentId
    
    // Fetch staff members from Firestore
    useEffect(() => {
        const fetchAdmin = async () => {
          const adminRef = collection(firestore, 'Admin');
          const adminSnapshot = await getDocs(adminRef);
          const adminData = adminSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(user => user.role === 'admin');
          setAdmin(adminData);
        };
    
        fetchAdmin();
      }, []);
  
    // Fetch messages between parent and selected staff member
    useEffect(() => {
      if (parentId && selectedAdminId) {
        const messagesQuery = query(
          collection(firestore, 'adminmessages'),
          where('receiverId', 'in', [parentId, selectedAdminId]),
          where('senderId', 'in', [parentId, selectedAdminId])
        );
  
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const newMessages = snapshot.docs.map((doc) => doc.data());
          const sortedMessages = newMessages.sort((a, b) => a.timestamp - b.timestamp);
  
          // Check if there are new messages
          if (sortedMessages.length < previousMessagesCount) {
            // Play sound for new messages
            const audio = new Audio(aud); 
            audio.play();
          }
  
          setMessages(sortedMessages);
          setPreviousMessagesCount(sortedMessages.length);
        });
  
        return unsubscribe;
      }
    }, [parentId, selectedAdminId, previousMessagesCount]);
  
    // Handle sending a message
    const handleSendMessage = async () => {
      if (!message.trim() || !selectedAdminId) return;
  
      setLoading(true);
  
      try {
        await addDoc(collection(firestore, 'adminmessages'), {
          senderId: parentId,
          receiverId: selectedAdminId,
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
 
  return (
    <div className="grid grid-cols-12 gap-4 w-full">
    {/* Chat Area */}
    <div className="col-span-12 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b  flex flex-col lg:flex-row  justify-between items-center text-gray-700 dark:text-neutral-200 border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900">
        {/* Chat Title */}
        <h6 className="text-base font-semibold leading-relaxed text-zinc-800 dark:text-neutral-100">Chat with Admin</h6>
  
        {/* Staff Selector */}
       
        <div className="">
        <FormControl fullWidth>
        <InputLabel className='dark:text-neutral-100'>   Select Admin</InputLabel>
      
          <Select
       label="Select Staff"
            className='dark:text-neutral-100 w-64'
            value={selectedAdminId}
            onChange={(e) => setSelectedAdminId(e.target.value)}
          >
            <MenuItem value="" disabled>
              Select Staff
            </MenuItem>
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
      <div
        className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 text-gray-700 dark:bg-neutral-900 dark:text-neutral-200"
        style={{ height: '280px' }}
      >
        {messages.map((msg, index) => {
          const messageDate = formatDate(msg.timestamp);
          const showDate = lastDate !== messageDate;
          lastDate = messageDate;
          return (
            <div key={index}>
              {showDate && (
                <div className="text-center my-2 font-medium text-gray-500 dark:text-neutral-400">
                  {messageDate}
                </div>
              )}
              <div className={`flex ${msg.senderId === parentId ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-3 rounded-lg max-w-xs break-words ${
                    msg.senderId === parentId ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  <span>{msg.content}</span>
                  <small className="block mt-1 text-xs text-gray-300">
                    {formatTime(msg.timestamp)}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
  
      {/* Chat Input */}
      <div className="p-4 border-t flex items-center space-x-2 bg-white text-gray-700 dark:bg-neutral-900 dark:border-neutral-800">
        <TextField
            InputLabelProps={{
              className:"dark:text-neutral-100",
              shrink: true, 
              
              }}
              InputProps={{
                  className:"dark:text-neutral-100",
                }}
          type="text"
           label="Type your message..."
className="flex-grow"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={!selectedAdminId}
        />
        <Button
            variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={loading || !selectedAdminId}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  </div>
  
  );
};

export default ParentChat2;
