import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics"; 


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

// Functions for authentication
export const createUser = async (name, email, password ) => {
  return createUserWithEmailAndPassword(getAuth(app), name, email, password);
};

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
};

// export const signInUser = async (email, password) => {
//   const auth = getAuth(app);
//   try {
//     console.log("Attempting sign in with email:", email);
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential?.user;

//     if (!user) {
//       throw new Error("User not found after sign-in");
//     }

//     console.log("User after sign-in:", user); // Логируем объект user

//     // Проверка наличия email
//     if (!user.email) {
//       throw new Error("Email not found on user object");
//     }

//     const idToken = await user.getIdToken();
//     console.log("Access token:", idToken);

//     return {
//       email: user.email,
//       accessToken: idToken,
//     };
//   } catch (error) {
//     console.error("Error signing in:", error);
//     throw new Error(error.message || "Unknown error during sign-in");
//   }
// };
