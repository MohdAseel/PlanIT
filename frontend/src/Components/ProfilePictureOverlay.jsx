import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider"; // Assuming your context holds user info
import Overlay from "./Overlay"; // Import your Overlay component
import { Link } from "react-router-dom"; // For linking to profile page
import "./components.css"; // Import styles for your component

const ProfilePictureOverlay = ({ onClose }) => {
  const { account } = useContext(DataContext); // Get user info from context

  return (
    <div className="profile-overlay-content">
      <div className="overlay-header">
        <h3>User Profile</h3>
      </div>
      <div className="overlay-body">
        <p><strong>Email:</strong> {account?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePictureOverlay;
