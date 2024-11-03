import React from "react";
import EventData from "./EventData";
import "./components.css";
const EventCard = (props) => {
  //props will have return an object with
  //event id is clubid +4numbers
  //fetch event data from eventid from EventData
  //as backend isnt setupped we create temporary setup

  //   id: "TAIC0001",
  //   title: "AI Club starter event",
  //   date: "2021-10-10",
  //   time: "10:00",
  //   description: "This is the first event of the AI Club of IIT Madras",
  //   image: "../../photos/images.png",
  const data = props.data;
  return (
    <div>
      <div className="event-card">
        <h2>{data.title}</h2>
        <h3>
          {data.time}
          <br />
          {data.date}
        </h3>
        <img src={data.image} alt="Event Image" />
        <p className="description">{data.description}</p>
        <div className="buttons">
          <button className="button add-event">Add Event</button>
          <button className="button learn-more">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
