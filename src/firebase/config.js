// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();
//console.log(env);
//console.log(process.env);
//console.log(import.meta.env);

// Your web app's Firebase configuration

// dev-prod
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
}; 

console.log(firebaseConfig);

// dev-testing 

/* const firebaseConfig = {
  apiKey: "AIzaSyCEn_Jd5bIgWYh4wtuJnXElJyxZ9VeWqKM",
  authDomain: "appstore-react.firebaseapp.com",
  projectId: "appstore-react",
  storageBucket: "appstore-react.firebasestorage.app",
  messagingSenderId: "147365581033",
  appId: "1:147365581033:web:94c8d4e20a1cc091d3e078",
  measurementId: "G-S7QYFVNR04"
}; */

/* const firebaseConfig = {
  apiKey: "AIzaSyCEn_Jd5bIgWYh4wtuJnXElJyxZ9VeWqKM",
  authDomain: "appstore-react.firebaseapp.com",
  projectId: "appstore-react",
  storageBucket: "appstore-react.firebasestorage.app",
  messagingSenderId: "147365581033",
  appId: "1:147365581033:web:94c8d4e20a1cc091d3e078",
  measurementId: "G-S7QYFVNR04"
}; */

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);
