
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../firebase';

const BroadChat= () => {
  const [messages, setMessages] = useState([]);

  const parentId = auth.currentUser?.uid; // Get the current parent's UID

  useEffect(() => {
    if (parentId) {
      const messagesRef = collection(firestore, `users/${parentId}/messages`);
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
  }, [parentId]);

  return (
    <div>
      <h1>Parent Dashboard</h1>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <p>{message.message}</p>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BroadChat;
