// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnp5Swk9EqzeuHY2WUHe-kQ1tqqcyEeg8",
  authDomain: "pegasus-maker-index.firebaseapp.com",
  projectId: "pegasus-maker-index",
  storageBucket: "pegasus-maker-index.appspot.com",
  messagingSenderId: "269399025599",
  appId: "1:269399025599:web:ad27f2c1a220693627630a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export Firebase services
export {
    db,
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    auth,
    provider,
    signInWithPopup,
    signOut
};