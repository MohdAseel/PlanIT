import React from "react";
import { Link } from "react-router-dom";

const ERROR404 = () => {
  return (
    <div>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default ERROR404;
