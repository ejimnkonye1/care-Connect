// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const auth = getAuth(app);
// const analytics = getAnalytics(app);