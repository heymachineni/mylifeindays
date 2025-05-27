import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { browser } from '$app/environment';

// Your web app's Firebase configuration
// Replace these with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO_rZRglo8KOERrXfVisi9102MPn-9tbI",
  authDomain: "life-in-weeks-4d29b.firebaseapp.com",
  projectId: "life-in-weeks-4d29b",
  storageBucket: "life-in-weeks-4d29b.firebasestorage.app",
  messagingSenderId: "584865220969",
  appId: "1:584865220969:web:7028d3b9e570157a78d5f8",
  measurementId: "G-20S37QXZN6"
};

// Initialize Firebase (only if not already initialized)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize analytics only in the browser
export const analytics = browser ? getAnalytics(app) : null;

// Helper function to check if user is logged in
export const isLoggedIn = () => {
  return !!auth.currentUser;
}; 