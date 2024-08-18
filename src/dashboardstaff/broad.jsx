
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { useSelector } from 'react-redux';

const BroadCast= () => {
  const [messages, setMessages] = useState([]);

  const StaffId = auth.currentUser?.uid; // Get the current parent's UID

  useEffect(() => {
    if (StaffId) {
      const messagesRef = collection(firestore, `staff/${StaffId}/messages`);
      const q = query(messagesRef, orderBy('timestamp', 'asc'));

      // Set up a real-time listener
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

      // Clean up the listener on unmount
      return () => unsubscribe();
    }
  }, [StaffId]);
  const darkmode = useSelector((state)=> state.darkMode)
  return (
    
      <div className='conatiner-fluid'>
        <div className='row'>
            <div className='col-md-6'>
              
            <div className="anouce-item">
      <ul className="annouce-list" >
        {messages.map((message, index) => (
          <li key={index} className={`annouce-item ${darkmode? 'card-mode card-color':''}`}>
            {message.message}
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </li>
          
        ))}
      </ul>
    </div>
            </div>




    </div>
     
    </div>
  );
};

export default BroadCast;
