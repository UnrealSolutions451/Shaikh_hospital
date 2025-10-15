// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Replace with your Firebase config (from Firebase Console > Project Settings)
const firebaseConfig = {
  apiKey: "AIzaSyCJMLDJb4RS0LlZTbeaSxaAWwR9qK_XqhE",
  authDomain: "shaikhhospital-bee4e.firebaseapp.com",
  projectId: "shaikhhospital-bee4e",
  storageBucket: "shaikhhospital-bee4e.firebasestorage.app",
  messagingSenderId: "33126021879",
  appId: "1:33126021879:web:4c3a5249e1248eb6aaf1f2",
  measurementId: "G-HWPYX5ZLG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore & Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Export for use in other files
export { db, auth };
