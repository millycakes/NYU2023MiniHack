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
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            toastSuccess("Registered!");
          } catch (error) {
            console.error(error);
            toastError(error.message);
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
<<<<<<< HEAD
        <Routing />
        <Toaster />
=======
      <Routing />
      <Toaster />
>>>>>>> 3b57d42d1eb7e5b7eeb9b64894644e84a0e6272e
    </AuthContext.Provider>
  );
}