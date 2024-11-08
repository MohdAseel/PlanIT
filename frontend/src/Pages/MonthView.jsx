import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider"; 
import SideBar from "../Components/Sidebar";
import MenuBar from "../Components/MenuBar";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import "./pagestyle/calendarpagestyle.css";
import "./pagestyle/pagestyle.css";


function MonthView() {
  const { account } = useContext(DataContext); // Get user account info
  const navigate = useNavigate();
  const [eventIds, setEventIds] = useState([]);
  const [eventData, setEventData] = useState([]);

  // Fetch event IDs for the logged-in user
  const fetchEventIds = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/getEventIdsByEmail?email=${account.email}`
      );
      const data = await response.json();

      if (response.ok) {
        setEventIds(data.eventIds); // Set event IDs to state
      } else {
        console.error("Error fetching event IDs:", data.message);
      }
    } catch (err) {
      console.error("Error fetching event IDs:", err);
    }
  };

  // Fetch event details by event IDs
  const fetchEventDetails = async () => {
    try {
      if (eventIds.length === 0) return; // Don't proceed if there are no event IDs

      const response = await fetch(
        `http://localhost:8000/api/getEventDetailsByIds?eventIds=${eventIds.join(",")}`
      );
      const data = await response.json();

      if (response.ok) {
        setEventData(data); // Set event details to state
      } else {
        console.error("Error fetching event data:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Use Effect to fetch event IDs and event details
  useEffect(() => {
    if (account && account.email) {
      fetchEventIds(); // Fetch event IDs based on the user's email
    }
  }, [account]);

  useEffect(() => {
    if (eventIds.length > 0) {
      fetchEventDetails(); // Fetch event details if event IDs are available
    }
  }, [eventIds]);

  // Calendar configuration
  const calendar = useCalendarApp({
    views: [createViewMonthGrid()],
    events: eventData.map((event) => ({
      id: event.eventId,
      title: event.title,
      start: event.startdate,
      end: event.enddate,
    })),
  });

  return (
    <div className="page-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="main-content">
        <h1>Scheduled Events</h1>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
      <div className="menubar-container">
        <MenuBar currentPage={"monthview"} />
      </div>
    </div>
  );
}

export default MonthView;
