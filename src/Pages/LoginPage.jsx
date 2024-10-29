import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <p>Log in to your account </p>
      <Link to="/weekview">Login</Link>
    </div>
  );
};

export default LoginPage;
