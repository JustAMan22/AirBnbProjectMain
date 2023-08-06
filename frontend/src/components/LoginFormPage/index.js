/* LoginFormPage.js */
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoUser = {
    credential: "Demo-lition",
    password: "password",
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <label className="login-label">
          {errors.credential && (
            <p className="login-error">{errors.credential}</p>
          )}
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Username or Email"
            required
            className="login-input"
          />
        </label>
        <label className="login-label">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="login-input"
          />
        </label>
        <button
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
          className="login-button"
        >
          Log In
        </button>
        <button
          onClick={() => dispatch(sessionActions.login(demoUser))}
          className="login-demo-button"
        >
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormPage;
