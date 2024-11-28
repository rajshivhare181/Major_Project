// Import the functions you need from the SDKs you need
import "firebase/auth";
import "firebase/app";
import '@react-native-async-storage/async-storage';
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, app };