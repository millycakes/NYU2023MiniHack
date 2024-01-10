// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
var admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

var serviceAccount = require("./sealthedeal-cbb42-firebase-adminsdk-14e1i-3ecd75a557.json");

// Initialize Firebase
const app = initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = getFirestore();

module.exports = { app, db };