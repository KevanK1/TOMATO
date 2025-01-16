import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleStateToggle = () => {
    setCurrState(currState === "Login" ? "Sign Up" : "Login");
    setFormData({ name: "", email: "", password: "" });
    setMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const url = currState === "Login" ? "/login" : "/register";

  const requestBody =
    currState === "Login"
      ? { email: formData.email, password: formData.password }
      : formData;

  try {
    const response = await fetch(`http://localhost:3000${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (response.ok) {
      if (currState === "Login") {
        setMessage("Login successful!");
        localStorage.setItem("token", data.token); // Store token for login
      } else {
        setMessage("Registration successful!");
        localStorage.setItem("token", data.token); // Store token for registration
      }
      setTimeout(() => setShowLogin(false), 1500); // Close the popup after 1.5 seconds
    } else {
      setMessage(data.msg || "Something went wrong.");
    }
  } catch (error) {
    setMessage("Error connecting to the server.");
  }
};

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
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
              No account? <span onClick={handleStateToggle}>Sign up here</span>
            </>
          ) : (
            <>
              Already have an account? <span onClick={handleStateToggle}>Login here</span>
            </>
          )}
        </p>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default LoginPopup;
