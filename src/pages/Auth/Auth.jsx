import React, { useState } from "react";
import "./Auth.css";
import { Form } from "react-router-dom";

function Auth() {
  const [existingUser, setExistingUser] = useState(false);
  return (
    <div>
      <div className="auth-container">
              {existingUser ? <Form className="auth-form">
                  <h1>Login with your email</h1>
                  <div className="form-group">
                      <input type="email" placeholder="Enter your email" required />
                      <input type="password" placeholder="Enter your password" required/>
                  </div>
                  <button type="Login"> Login</button>
                  <p>Dont't have an account </p>
              </Form> : <Form>Sign up</Form>}
      </div>
    </div>
  );
}

export default Auth;
