import { useState, useEffect } from 'react';

import { collection,  onSnapshot, query, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase';



const Staffmes = () => {
  const [messages, setMessages] = useState([]);
  const parentId = auth.currentUser?.uid; // Using Firebase auth UID as parentId
 const staffId = 'GH9zEwL3PCh5cOWBFhbJKTKo8Fk1';


  useEffect(() => {
    if (parentId && staffId) {
      const messagesQuery = query(
        collection(firestore, 'messages'),
        where('receiverId', '==', parentId), // Filter by parent ID
        where('senderId', '==', staffId) // Filter by staff ID
      );
  
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => doc.data());
        const sortedMessages = newMessages.sort((a, b) => a.timestamp - b.timestamp);
  
        setMessages(sortedMessages);
      });
  
      return unsubscribe;
    }
  }, [parentId, staffId, messages]);

  
  return (
    <div className=''>
   
    <div className='communication-content'>
     
          <ul className='communication-list'>
            {messages.map((msg, index) => {
              return (
                <div key={index}>

                  <li
                    className={`communication-item btn-info `}
                  >
                    
                    <span>{msg.content}</span>
                 
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>

 
  );
};

export default Staffmes;
