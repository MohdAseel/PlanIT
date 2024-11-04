import { React, useState } from "react";
import EventData from "./EventData";
import "./components.css";
import EventCardExpanded from "./EventCardExpanded";
import Overlay from "./Overlay";

function EventCard(props) {
  //props will have return an object with
  //event id is clubid +4numbers
  //fetch event data from eventid from EventData
  //as backend isnt setupped we create temporary setup

  //   id: "TAIC0001",
  //   title: "AI Club starter event",
  //   date: "2021-10-10",
  //   time: "10:00",
  //   location: "CLT",
  //   description: "This is the first event of the AI Club of IIT Madras",
  //   image: "../../photos/images.png",
  const data = props.data;

  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="event-card">
        <h2 className="event-title">{data.title}</h2>
        <h2 className="event-time">
          {data.time}
          <br />
          {data.date}
        </h2>
        <img className="event-image" src={data.image} alt="Event Image" />
        <p className="event-location">location: {data.location}</p>
        <p className="event-description">{data.description}</p>
        <div className="dual-botton-container">
          <button className="btn-left">Add Event</button>
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
