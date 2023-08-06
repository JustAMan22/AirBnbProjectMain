import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div className="signup-form">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label className="signup-label">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="signup-input"
          />
        </label>
        {errors.username && <p className="error-message">{errors.username}</p>}
        <label className="signup-label">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="signup-input"
          />
        </label>
        <label className="signup-label">
          {errors.firstName && (
            <p className="error-message">{errors.firstName}</p>
          )}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
            className="signup-input"
          />
        </label>
        <label className="signup-label">
          {errors.lastName && (
            <p className="error-message">{errors.lastName}</p>
          )}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
            className="signup-input"
          />
        </label>
        <label className="signup-label">
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="signup-input"
          />
        </label>
        <label className="signup-label">
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="signup-input"
          />
        </label>
        <button
          type="submit"
          disabled={
            !email.length ||
            !username.length ||
            !password.length ||
            !firstName.length ||
            !lastName.length ||
            !confirmPassword.length ||
            password.length < 4 ||
            confirmPassword.length < 4 ||
            username.length < 4
          }
          className="signup-button"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
