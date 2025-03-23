
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZMkAbXMgJrdOFnqGrZ_mpSI3PDvMX2iI",
  authDomain: "interview-platform-9a879.firebaseapp.com",
  projectId: "interview-platform-9a879",
  storageBucket: "interview-platform-9a879.firebasestorage.app",
  messagingSenderId: "699136856336",
  appId: "1:699136856336:web:bec09db9943ab29ff9d595",
  measurementId: "G-67VJLR9NG9"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);