// EventDetailsOverlay.jsx
import React from "react";
import "./components.css"; // Ensure you have the necessary styles

const EventDetailsOverlay = ({ onClose, event }) => {
  if (!event) return null;

  const {
    title,
    startdate,
    enddate,
    location,
    description,
    image,
    clubId,
  } = event;

  return (
    <div className="event-details-overlay">
      <div className="overlay-header">
        <h2>{title}</h2>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="overlay-body">
        {image && <img src={image} alt={title} className="event-image" />}
        <p><strong>Club:</strong> {clubId}</p>
        <p><strong>Start Date:</strong> {new Date(startdate).toLocaleString()}</p>
        <p><strong>End Date:</strong> {new Date(enddate).toLocaleString()}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Description:</strong> {description}</p>
      </div>
    </div>
  );
};

export default EventDetailsOverlay;