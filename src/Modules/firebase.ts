// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCSWJ_Hk5rDDRV1_se9quQo6K1q-uyo0V0",
    authDomain: "todo-app-7f5ba.firebaseapp.com",
    projectId: "todo-app-7f5ba",
    storageBucket: "todo-app-7f5ba.appspot.com",
    messagingSenderId: "127860997982",
    appId: "1:127860997982:web:8fbdc650a59c217ff599cf",
    measurementId: "G-NRD9Z31EX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);