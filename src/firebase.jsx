import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Or getFirestore for Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const loginUser = (userName) => {
  // Assuming user selects or inputs their name.
  const userRef = ref(db, "users");
  set(userRef, {
    player1: { name: "Player1", symbol: "X" },
    player2: { name: "Player2", symbol: "O" }
  });
};

// Firebase services
export const auth = getAuth(app);
export const db = getDatabase(app); // Or Firestore if using Firestore
export const googleAuthProvider = new GoogleAuthProvider(); // Export GoogleAuthProvider
