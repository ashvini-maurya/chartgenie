import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import CgInput from "../../components/input/input";
import CgButton from "../../components/button/button";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          alert("Account created successfully!!, Login to access chart geine.");
          navigate("/login");
        }
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-body">
        <h3 className="logo"> CHART GENIE </h3>
        <form onSubmit={onSubmit}>
          <CgInput
            label="Email address"
            id="email-address"
            type="email"
            value={email}
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <CgInput
            label="Password"
            id="password"
            type="password"
            value={password}
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <CgButton type="submit" classes="submit-button">
            Sign up
          </CgButton>
        </form>

        <p>
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
