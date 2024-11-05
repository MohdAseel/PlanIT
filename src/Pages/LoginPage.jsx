// frontend/src/components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pagestyle/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      navigate("/weekview"); 
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div>
      <div className="header-login-container">
        <div className="page-header">
          <h1 className="main-heading">PLANIT</h1>
          <p className="tagline">
            From Deadlines to Socials, We’ve Got <br />
            You Covered
          </p>
        </div>

        <div className="login-container">
          <label className="login-header">Login</label>
          <form onSubmit={handleLogin}>
            <label htmlFor="email" className="right-align">
              <b>User email:</b>
            </label>
            <input
              type="email"
              id="email"
              placeholder="rollno@smail.iitm.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className="right-align">
              <b>Password:</b>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
