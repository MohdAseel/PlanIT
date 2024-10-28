import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert("Login successful!");
    } else {
      alert("Invalid credentials. Please try again or sign up.");
      navigate("/signup");
    }
  };

  return (
    <div>
      <div className="header-login-container">
        <div className="page-header">
          `<h1 className="main-heading">PLANIT</h1>
          <p className="tagline">
            From Deadlines to Socials, We’ve Got <br />
            You Covered
          </p>
        </div>

        <div className="login-container">
          <div>
            <label className="login-header">Login</label>

            <label for="username" className="right-align">
              <b>User email:</b>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="rollno@smail.iitm.ac.in"
            />

            <label for="password" className="right-align">
              <b>Password:</b>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />

            <input type="submit" value="Login" />
          </div>
        </div>
      </div>

      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
