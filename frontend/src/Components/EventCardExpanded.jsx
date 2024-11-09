import { React, useState, useContext } from "react";
import { DataContext } from "../context/DataProvider"; // Import DataContext to access account
import Overlay from "./Overlay";
import axios from "axios"; // Import axios for HTTP requests
import "./components.css";

function EventCardExpanded(props) {
  const { data, onClose } = props; // Destructure data and onClose from props
  const { account } = useContext(DataContext); // Access user account from context
  const [isLoading, setIsLoading] = useState(false); // Loading state for the event addition

  const addEvent = async () => {
    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);
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
    } finally {
      setIsLoading(false); // Reset loading state after request is finished
    }
  };

  return (
    <div className="event-card-expanded">
      <div className="event-header">
        <h2 className="event-title">{data.title}</h2>
        <h2 className="event-time">
          {data.time}
          <br />
          {data.date}
        </h2>
      </div>

      <div className="event-card-expanded-splitter">
        <div className="event-card-expanded-splitter-left">
          <img
            className="event-image"
            src={data.image}
            alt="Event Image Placeholder"
          />

          <div className="event-description">{data.description}</div>
        </div>
        <div className="event-card-expanded-splitter-right">
          <div className="faq"></div>
          <div className="question-section">
            <p>Still have doubts? Why not contact us...</p>
          </div>
        </div>
      </div>

      <div className="dual-button-container">
        <button
          className="btn-left"
          onClick={addEvent}
          disabled={isLoading} // Disable button when event is being added
        >
          {isLoading ? "Adding..." : "Add Event"} {/* Show loading state */}
        </button>
        <button className="btn-right" onClick={onClose}>
          Show less
        </button>
      </div>
    </div>
  );
}

export default EventCardExpanded;
