// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw5xyUx70hMqp2u_c3L93YLU1D7KlWU9A",
  authDomain: "sealthedeal-cbb42.firebaseapp.com",
  projectId: "sealthedeal-cbb42",
  storageBucket: "sealthedeal-cbb42.appspot.com",
  messagingSenderId: "245434852967",
  appId: "1:245434852967:web:f8f56a5591bf030ac016c2",
  measurementId: "G-W9N2WJSSN4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const Firebase = initializeApp(firebaseConfig);
export const auth = getAuth(Firebase);
export const FIREBASE_AUTH = getAuth(app);
export const db = getFirestore(Firebase);