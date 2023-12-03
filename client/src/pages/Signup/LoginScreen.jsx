import React, { useContext, useState } from "react";
import { AuthContext } from "../../App.js";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import "../assets/css/signupscreen.css";
import { toastError, toastSuccess } from "../../GlobalFunctions.js";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { login } = useContext(AuthContext);

  return (
    <div className="authdiv">
    <p className="authtitle lg:text-[5rem] md:text-[4rem] text-[2.5rem]">SealDeal</p>
      <p id="createacc" className="text-white">
        Login
      </p>
      <div id="loginform" className="authform flex flex-col items-center">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email-address"
          autoCapitalize="none"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="buttons"
          onClick={(e) => {
            e.preventDefault();
            login(email, password);
          }}
        >
          Sign In
        </button>
      </div>

      <button
        className="buttons"
        onClick={async () =>
          await sendPasswordResetEmail(auth, email)
            .then(() => {
              if (email.includes("@") && email.includes(".com")) {
                toastSuccess("Password reset email sent!");
              } else {
                toastError("Please enter a valid email.");
              }
            })
            .catch((e) => {
              if (e.code === "auth/invalid-email") {
                toastError("Please enter a valid email.");
              }
            })
        }
      >
        Forgot Password?
      </button>

      <button className="buttons" onClick={() => navigate("/")}>
        Don't have an account? Create here
      </button>
    </div>
  );
}
