// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXGM0yv8wLn0XBoXTRi6tWcYYjHujilxs",
  authDomain: "react-journal-app-d6bef.firebaseapp.com",
  projectId: "react-journal-app-d6bef",
  storageBucket: "react-journal-app-d6bef.firebasestorage.app",
  messagingSenderId: "865475393070",
  appId: "1:865475393070:web:932a83fafa9c27e7cdd1bf"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);
