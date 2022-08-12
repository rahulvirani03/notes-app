// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvcsGAAu6gBKStyGkvTD6SKNYgTMOtjYc",
  authDomain: "notes-76857.firebaseapp.com",
  projectId: "notes-76857",
  storageBucket: "notes-76857.appspot.com",
  messagingSenderId: "69637962396",
  appId: "1:69637962396:web:f8371ea20a2526aed38b59",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export { firebaseApp, db };
