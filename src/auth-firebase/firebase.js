import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { getDatabase, ref, push, set } from 'firebase/database';
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const database = getDatabase(app);
export const firestore = getFirestore(app);

// Functions for authentication
export const createUser = async (name, email, password ) => {
  return createUserWithEmailAndPassword(getAuth(app), name, email, password);
};

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
};



