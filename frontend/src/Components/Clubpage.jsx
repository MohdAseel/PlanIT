import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClubData from "./ClubData";
import Sidebar from "./Sidebar";
import MenuBar from "./MenuBar";
import "../Pages/pagestyle/pagestyle.css";
import EventCard from "./EventCard";
import { DataContext } from "../context/DataProvider";
import CreateEvent from "./CreateEvent";
import Overlay from "./Overlay";
import { Button } from "antd";
import Star from "./Star";  // Import the Star component

function ClubPage() {
  const { reload, setReload } = useState([]);
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Toggle overlay state for Create Event
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const { account } = useContext(DataContext); // Get account info from context

  // Find the current club data based on clubId
  const data = ClubData.find((data_club) => data_club.id === clubId);

  // Fetch the events for this specific club
  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:8000/${clubId}`);
      const events = await response.json();
      setEventData(events);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEvents();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!data) {
    return (
      <>
        <h1>Data not found</h1>
        <button onClick={() => navigate(-1)}>Back</button>
      </>
    );
  }

  const handleEventCreated = () => {
    fetchEvents(); // Fetch events again after an event is created
  };

  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>{data.name}</h1>
        <p>{data.description}</p>

        {/* Show buttons depending on user role */}
        <div style={{ textAlign: "center", display: "flex", justifyContent: "space-between" }}>
          {/* Only show Create Event button if the user is an admin */}
          {account.role === "admin" ? (
            <>
              <Button onClick={toggleOverlay}>Create Event</Button>
              <Overlay isOpen={isOverlayOpen} onClose={toggleOverlay}>
                <CreateEvent
                  isOpen={isOverlayOpen}
                  onClose={toggleOverlay}
                  onEventCreated={handleEventCreated}
                />
              </Overlay>
            </>
          ) : null}

          {/* Both admins and students can see the Star Club button */}
          <Star clubId={clubId} />
        </div>

        <div className="event-card-container">
          {eventData.map((event) => (
            <EventCard key={event._id} data={event} />
          ))}
        </div>
      </div>
      <div className="menubar-container">
        <MenuBar props="dayview" />
      </div>
    </div>
  );
}

export default ClubPage;
