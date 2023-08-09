import React, { useState } from "react";
import { auth } from "../../config/firebaseCongfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth() {
  const navigate = useNavigate();
  const [existingUser, setExistingUser] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(auth.currentUser, { displayName: name });
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((res) =>
      navigate("/").catch((err) => console.log(err))
    );
  };
  return (
    <div className="auth-container">
      {existingUser ? (
        <form onSubmit={handleLogin} className="auth-form">
          <h1>Login with your email</h1>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <span className="form-link" onClick={() => setExistingUser(false)}>
              Sign up
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignup} className="auth-form">
          <h1>Signup with your email</h1>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit">Signup</button>
          <p>
            Already have an account?{" "}
            <span className="form-link" onClick={() => setExistingUser(true)}>
              Login
            </span>
          </p>
        </form>
      )};
    </div>
  );
}

export default Auth;
