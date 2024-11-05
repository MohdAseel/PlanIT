import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => setUserEmail(data.email))
      .catch(() => console.log("Failed to fetch user email"));
  }, []);

  return <div className="user-email">{userEmail ? `Email: ${userEmail}` : "Loading..."}</div>;
};

export default UserProfile;
