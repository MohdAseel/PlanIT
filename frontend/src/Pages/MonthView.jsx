import React, { useEffect, useState, useContext, Suspense } from "react";

import { DataContext } from "../context/DataProvider";
import SideBar from "../Components/Sidebar";
import MenuBar from "../Components/MenuBar";
import "./pagestyle/calendarpagestyle.css";
import "./pagestyle/pagestyle.css";
import axios from "axios";
import dayjs from "dayjs";

import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid } from "@schedule-x/calendar";

function Calendar(props) {
  const value = JSON.parse(JSON.stringify(props.eventData));
  // Assuming eventData is an array of events

  const createNewCalendar = () => {
    return useCalendarApp({
      views: [createViewMonthGrid()],
      events: value.map((event) => ({
        id: event.eventId,
        title: event.title,
        start: dayjs(event.startdate).format("YYYY-MM-DD HH:mm"),
        end: dayjs(event.enddate).format("YYYY-MM-DD HH:mm"),
      })),
    });
  };

  return <ScheduleXCalendar calendarApp={createNewCalendar(props)} />;
}

function MonthView() {
  const { account } = useContext(DataContext); // Get user account info

  const [eventData, setEventData] = useState();
  const [eventIds, setEventIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [personalEvents, setPersonalEvents] = useState([]);

  // Fetch event IDs for the logged-in user
  const fetchEventIds = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getEventIds?email=${account.email}`
      );

      const data = response.data;

      if (response.status === 200) {
        setEventIds(data.eventIds);

        setPersonalEvents(data.personal_events); // Set event IDs to state
      } else {
        console.error("Error fetching event IDs:", data.message);
      }
    } catch (err) {
      console.error("Error fetching event IDs:", err);
    }
  };

  console.log(eventIds);
  // Fetch event details by event IDs
  const fetchEventDetails = async () => {
    if (eventIds.length === 0) return; // Don't proceed if there are no event IDs

    const values = { eventIds };
    const response = await axios
      .post("http://localhost:8000/api/getEventDetails", values)
      .then((response) => {
        setEventData([...response.data, ...personalEvents]);
        setLoading(false); // Set event details to state
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Error fetching event data:", error);
      });
  };

  // Use Effect to fetch event IDs and event details
  useEffect(() => {
    if (account && account.email) {
      fetchEventIds(); // Fetch event IDs for the logged-in user
    }
  }, [account]);

  useEffect(() => {
    if (eventIds.length > 0) {
      fetchEventDetails(); // Fetch event details if event IDs are available
    }
  }, [eventIds]);

  // Calendar configuration
  // const calendar = useCalendarApp({
  //   views: [createViewMonthGrid()],
  //   events: [
  //     {
  //       id: "1asws",
  //       title: "Event 1",
  //       start: "2024-11-27 00:00",
  //       end: "2024-11-27 00:30",
  //     },
  //   ],
  // });

  // Handle loading state while eventData is not yet fetched
  if (!eventData) {
    return <div>Loading event data...</div>;
  }

  // Handle case where calendar is not yet created

  console.log(eventData); // This triggers a re-render with new data

  return (
    <div className="page-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="main-content">
        <Suspense fallback={<div>Loading...</div>} />
        <Calendar eventData={eventData} />
        <Suspense />
      </div>
      <div className="menubar-container">
        <MenuBar currentPage={"monthview"} />
      </div>
    </div>
  );
}

export default MonthView;
