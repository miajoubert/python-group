import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./auth.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} className="signup-form-container">
      <div className="errors-list">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div id="create_account-logo">
        <p className="sign-up-text">Create your account</p>
      </div>
      <div id="signup-container">
        <div className="signup-text-container">
          <label htmlFor="username">User Name</label>
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            onChange={updateUsername}
            value={username}
            required={true}
            className="username_input-bar"
          ></input>
        </div>
        <div className="signup-text-container">
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={updateEmail}
            value={email}
            required={true}
            className="email_input-bar"
          ></input>
        </div>
        <div className="signup-text-container">
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={updatePassword}
            value={password}
            required={true}
            className="password_input-bar"
          ></input>
        </div>
        <div className="signup-text-container">
          <label htmlFor="repeat-password">Repeat Password</label>
        </div>
        <div>
          <input
            type="password"
            name="repeat_password"
            placeholder="Repeat Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            className="repeat_password_input-bar"
          ></input>
        </div>
          <button type="submit" className="sign_up-btn">
            Sign Up
          </button>
          <p className="petsy-policy"> By clicking Sign in, you agree to Petsy's Terms of Use and Privacy
            Policy, which does not exist. Petsy will not send you
            communications and post without your permission.</p>
      </div>
    </form>
  );
};

export default SignUpForm;
