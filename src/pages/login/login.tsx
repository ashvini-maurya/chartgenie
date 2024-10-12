import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import CgInput from "../../components/input/input";
import CgButton from "../../components/button/button";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        sessionStorage.setItem(
          "user_session",
          JSON.stringify(userCredential.user)
        );
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-body">
        <h3 className="logo"> CHART GENIE </h3>
        <form onSubmit={onLogin}>
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
            Login
          </CgButton>
        </form>

        <p>
          No account yet? <NavLink to="/signup">Sign up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
