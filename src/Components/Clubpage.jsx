import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClubData from "./ClubData";
import Sidebar from "./Sidebar";
import MenuBar from "./MenuBar";
import "../Pages/pagestyle/pagestyle.css";
import EventCard from "./EventCard";

import EventData from "./EventData";

function ClubPage() {
  // Extract the club id from the URL parameters
  const { clubId } = useParams();
  const navigate = useNavigate();

  // Fetch club data based on the club id
  const data = ClubData.find((data_club) => data_club.id === clubId);

  if (!data) {
    return (
      <>
        <h1>Data not found</h1>
        <button onClick={() => navigate(-1)}>Back</button>
      </>
    );
  }

  const eData = EventData.find((data) => data.clubid === clubId);
  const eventData = eData ? eData.data : [];

  //eventData is an array of objects with eventid ,title, date, time, description, imagelink
  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <div className="event-card-container">
          {eventData
            ? eventData.map((event) => (
                <EventCard key={event.id} data={event} />
              ))
            : null}
        </div>
      </div>
      <div className="menubar-container">
        <MenuBar props="dayview" />
      </div>
    </div>
  );
}

export default ClubPage;
