import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwcWiLjusFwKFCTXrnGxuztrvszUJ4ddY",
  authDomain: "mess-intelligence.firebaseapp.com",
  projectId: "mess-intelligence",
  storageBucket: "mess-intelligence.firebasestorage.app",
  messagingSenderId: "916910090325",
  appId: "1:916910090325:web:84fc6dfd30dd61d0b38cdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Database instances
export const auth = getAuth(app);
export const db = getFirestore(app);
