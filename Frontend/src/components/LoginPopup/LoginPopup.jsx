import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  const handleStateToggle = () => {
    setCurrState(currState === "Login" ? "Sign Up" : "Login");
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input type="text" placeholder="Your Name" required />
          )}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <p>
          {currState === "Login" ? (
            <>
              No account?{" "}
              <span onClick={handleStateToggle}>Sign up here</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={handleStateToggle}>Login here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;