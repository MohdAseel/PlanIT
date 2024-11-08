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

function ClubPage() {
  const { realod, setReload } = useState([]);
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);
  //for overlay of create event
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const { account } = useContext(DataContext);
  ///here account.role is the role of the user

  const data = ClubData.find((data_club) => data_club.id === clubId);

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
    fetchEvents();
  });

  if (!data) {
    return (
      <>
        <h1>Data not found</h1>
        <button onClick={() => navigate(-1)}>Back</button>
      </>
    );
  }

  // Callback function to handle event creation
  const handleEventCreated = () => {
    fetchEvents(); // Fetch events again to update the list
  };

  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        {account.role === "admin" ? (
          <div style={{ textAlign: "center" }}>
            <Button onClick={toggleOverlay}>Create Event</Button>
            <Overlay isOpen={isOverlayOpen} onClose={toggleOverlay}>
              <CreateEvent
                isOpen={isOverlayOpen}
                onClose={toggleOverlay}
                onEventCreated={handleEventCreated}
              />
            </Overlay>
          </div>
        ) : null}
        <div className="event-card-container">
          {console.log(eventData)}
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
