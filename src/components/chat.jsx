import { useState, useEffect } from 'react';

import { collection, addDoc, Timestamp, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import aud from '../audio/mixkit.wav';
import { MenuItem,Select,FormControl,InputLabel, TextField, Button } from '@mui/material';

const ParentChat = () => {
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
 
  return (
    <div className="grid grid-cols-12 gap-4 w-full">
    {/* Chat Area */}
    <div className="col-span-12 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b flex justify-between items-center text-gray-700 dark:text-neutral-200 border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900">
        {/* Chat Title */}
        <h6 className="text-lg font-semibold text-gray-700 dark:text-neutral-200">Chat with Staff</h6>
  
        {/* Staff Selector */}
       
        <div className="">
        <FormControl fullWidth>
        <InputLabel className='dark:text-neutral-100'>   Select Staff</InputLabel>
      
          <Select
       label="Select Staff"
            className='dark:text-neutral-100 w-64'
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
          >
            <MenuItem value="" disabled>
              Select Staff
            </MenuItem>
            {staffList.map((staff) => (
              <MenuItem key={staff.id} value={staff.id}>
                {staff.name} ({staff.email})
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
          disabled={!staffId}
        />
        <Button
            variant="contained"
          color="primary"
          onClick={handleSendMessage}
          // disabled={loading || !staffId}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  </div>
  
  );
};

export default ParentChat;
