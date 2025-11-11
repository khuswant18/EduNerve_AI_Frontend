// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5-oP_qwUWuyssaJTEJCYtf3GbtglJOs4",
  authDomain: "mockai-460e1.firebaseapp.com",
  projectId: "mockai-460e1",
  storageBucket: "mockai-460e1.firebasestorage.app",
  messagingSenderId: "1026765005519",
  appId: "1:1026765005519:web:dd6988d9aa24faadbf8dba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;