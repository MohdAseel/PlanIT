import React, { useEffect } from "react";
import SideBar from "../Components/Sidebar.jsx";
import MenuBar from "../Components/MenuBar";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewDay } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import "./pagestyle/calendarpagestyle.css";
import "./pagestyle/pagestyle.css";

function DayView() {
  const calendar = useCalendarApp({
    views: [createViewDay()],
    events: [
      {
        id: 131,
        title: "Event 1",
        start: "2024-10-30 00:00",
        end: "2024-10-30 23:59",
      },
      {
        id: 221,
        title: "Event 2",
        start: "2024-10-30 00:00",
        end: "2024-10-30 02:59",
      },
    ],
  });

  return (
    <div className="page-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="main-content">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
      <div className="menubar-container">
        <MenuBar props="dayview" />
      </div>
    </div>
  );
}

export default DayView;
