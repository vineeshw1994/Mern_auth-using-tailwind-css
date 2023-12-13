// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-with.firebaseapp.com",
  projectId: "mern-auth-with",
  storageBucket: "mern-auth-with.appspot.com",
  messagingSenderId: "591037471340",
  appId: "1:591037471340:web:e526bd2f96cf0e7ace9649"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);