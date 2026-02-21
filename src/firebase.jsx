import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Paste YOUR config details here
const firebaseConfig = {
  apiKey: "AIzaSyCbUZzVhqgzhYblRR3TrkVUBYiXOj__tQg",
  authDomain: "dipram---portfolio-website.firebaseapp.com",
  projectId: "dipram---portfolio-website",
  storageBucket: "dipram---portfolio-website.firebasestorage.app",
  messagingSenderId: "7700806753",
  appId: "1:7700806753:web:36df19194471ed5d3d3e20",
  measurementId: "G-3PG8X9KN56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);