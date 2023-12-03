import React, { createContext, useState } from "react";
import Routing from "./components/global/Routing.jsx";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { toastError, toastSuccess } from "./GlobalFunctions.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          const res = await signInWithEmailAndPassword(auth, email, password)
          if (res.error) {
            console.error(res);
            toastError(res.error.message)
          } else {
            toastSuccess("Signed in!");
          }
        },
        register: async (email, password) => {
          const res = await createUserWithEmailAndPassword(auth, email, password)
          if (res.error) {
            console.log(res)
            toastError(res.error.message);
            return false;
          } else {
            toastSuccess("Registered!");
          }
        },
        logout: async () => {
          await signOut(auth)
            .then(async () => {
              toastSuccess("Logged out.")
            })
        },
      }}
    >
      <Routing />
      <Toaster />
    </AuthContext.Provider>
  );
}