// src/Pages/EventDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import MenuBar from "../Components/MenuBar";
import "./pagestyle/pagestyle.css";
import axios from "axios";

export default function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/event/${eventId}`);
        console.log("API Response:", response.data); // Debugging step

        const data = response.data;

        if (data.success && data.event) {
          setEvent(data.event);
        } else if (data.event) { // If 'success' is not present
          setEvent(data.event);
        } else {
          setError("Event not found.");
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Unable to load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="main-content">
          <p>Loading event details...</p>
        </div>
        <div className="menubar-container">
          <MenuBar currentPage="eventDetail" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="main-content">
          <p className="error">{error}</p>
          <button onClick={handleBackClick} className="back-button">
            Go Back
          </button>
        </div>
        <div className="menubar-container">
          <MenuBar currentPage="eventDetail" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>{event.title}</h1>
        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(event.startdate).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {new Date(event.enddate).toLocaleDateString()}
        </p>
        <p>
          <strong>Start Time:</strong>{" "}
          {new Date(event.startdate).toLocaleTimeString()}
        </p>
        <p>
          <strong>End Time:</strong>{" "}
          {new Date(event.enddate).toLocaleTimeString()}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Club ID:</strong> {event.clubId}
        </p>
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            style={{ maxWidth: "100%", marginTop: "20px" }}
          />
        )}
        <button onClick={handleBackClick} className="back-button">
          Go Back
        </button>
      </div>
      <div className="menubar-container">
        <MenuBar currentPage="eventDetail" />
      </div>
    </div>
  );
}