// EventCard.jsx
import { React, useState, useContext } from "react";
import { DataContext } from "../context/DataProvider";
import EventCardExpanded from "./EventCardExpanded";
import Overlay from "./Overlay";
import "./components.css";
import axios from "axios"; // Import axios for HTTP requests

function EventCard(props) {
  const data = props.data;
  const { account } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  const addEvent = async () => {
    try {
      const response = await axios.post("http://localhost:8000/user/addEvent", {
        email: account.email,
        eventId: data.eventId,
      });
      console.log(response.data); // Log server response
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };

  // Format start and end dates
  const startDate = new Date(data.startdate);
  const endDate = new Date(data.enddate);

  const formattedStartDate = startDate.toLocaleDateString();
  const formattedStartTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formattedEndDate = endDate.toLocaleDateString();
  const formattedEndTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <div className="event-card">
        <h2 className="event-title">{data.title}</h2>
        <h2 className="event-dates">
          <strong>Start:</strong> {formattedStartDate} at {formattedStartTime}
          <br />
          <strong>End:</strong> {formattedEndDate} at {formattedEndTime}
        </h2>
        {data.image && (
          <img className="event-image" src={data.image} alt={`${data.title} Image`} />
        )}
        <p className="event-location"><strong>Location:</strong> {data.location}</p>
        <p className="event-description">{data.description}</p>

        <div className="dual-button-container">
          <button className="btn-left" onClick={addEvent}>Add Event</button>
          <button className="btn-right" onClick={toggleOverlay}>
            Learn More
          </button>
          <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <EventCardExpanded data={data} />
          </Overlay>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
