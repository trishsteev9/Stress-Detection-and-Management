// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2DWz6SkyC5tq9tdH20tTYkv-95KdCi2k",
  authDomain: "stress-detection-nd-management.firebaseapp.com",
  databaseURL: "https://stress-detection-nd-management-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stress-detection-nd-management",
  storageBucket: "stress-detection-nd-management.firebasestorage.app",
  messagingSenderId: "885095610449",
  appId: "1:885095610449:web:8fc02cd933e367d2d72070",
  measurementId: "G-6EN993EM3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);