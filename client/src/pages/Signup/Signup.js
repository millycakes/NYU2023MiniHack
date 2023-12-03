import { useNavigate } from "react-router-dom";
import { FIREBASE_AUTH } from '../../firebase.js';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import React from  'react';

export default function Signup () {
    const email = React.useState("");
    const password = React.useState("");
    const navigate = useNavigate();
    const signup = async (e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then(async (userCredential) => {
            console.log(userCredential)
            navigate("/");
        })
        .catch((error) => {
            switch (error.code) {
                case" auth/email-already-exists":
                    alert ("Error: Email already exists!");
                    break;
                case "auth/invalid-email":
                    alert ("Error: Email provided is invalid!");
                    break;
                case "auth/invalid-password":
                    alert("Error: Password must be at least 6 characters long!");
                    break;
                default:
                    alert(error.message);
            }
        });
    }

    const signin = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then((userCredential) => {
            console.log(userCredential.user);
            navigate("/")
        })
        .catch((error) => {
            console.log("Error with", error.code, ":", error.message);
        });
    }
}