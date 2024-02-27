// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_q2KBP7a5FyCR0a9RAlCUDWnt_CJigI0",
  authDomain: "eldercare-3e553.firebaseapp.com",
  projectId: "eldercare-3e553",
  storageBucket: "eldercare-3e553.appspot.com",
  messagingSenderId: "276202044865",
  appId: "1:276202044865:web:41dae9c03d00590a404340",
  measurementId: "G-DEK2LK0THK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);