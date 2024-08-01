import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyCbZVxvKRy5mxNo9bL2SMJXQz-mPZZPHL0",
  authDomain: "care-connect-38e17.firebaseapp.com",
  projectId: "care-connect-38e17",
  storageBucket: "care-connect-38e17.appspot.com",
  messagingSenderId: "83805558888",
  appId: "1:83805558888:web:2846a0d97905580d1983dd",
  measurementId: "G-Y8WDSFZB0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, firestore, storage, database };
