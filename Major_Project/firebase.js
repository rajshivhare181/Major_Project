// Firebase SDK imports
import "firebase/auth";
import "firebase/app";
import "@react-native-async-storage/async-storage";

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8NcGfSK-Tj5GEP8TrgBmPpoaI5eurtiY",
  authDomain: "aao-mahare-desh-4e784.firebaseapp.com",
  projectId: "aao-mahare-desh-4e784",
  storageBucket: "aao-mahare-desh-4e784.firebasestorage.app",
  messagingSenderId: "228211337974",
  appId: "1:228211337974:web:f7401f4eddf8b04bdfdad7",
  measurementId: "G-P9K6XVWL4P"
};

// Initialize Firebase
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, app, db, storage };