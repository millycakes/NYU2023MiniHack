import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "../assets/css/signupscreen.css";
import { toastError } from "../../GlobalFunctions";

export default function SignupScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { register } = useContext(AuthContext);

  return (
    <div className="authdiv">
      <p className="authtitle lg:text-[5rem] md:text-[4rem] text-[2.5rem]">SealDeal</p>
      <p id="createacc" className="text-black">
        Sign Up
      </p>
      <form className="flex flex-col items-center justify-center">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email-address"
          autoCapitalize="none"
          autoCorrect="false"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="password" placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type="button" className="buttons !px-4 py-[.375rem]"
          onClick={() => {
            if (password !== confirmPassword) {
              toastError("Passwords do not match!");
            } else {
              register(email, password);
            }
          }}
          value="Sign Up"
        />
      </form>

      <p className="mt-4 font-medium">Already have an account?</p>
      <button
        id="signinbutton"
        className="buttons"
        onClick={() => navigate("/signin")}
      >
        Sign In
      </button>
    </div>
  );
}