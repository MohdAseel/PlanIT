import React, { useEffect } from "react";
import SideBar from "../Components/Sidebar";
import MenuBar from "../Components/MenuBar";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewMonthGrid } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import "./pagestyle/calendarpagestyle.css";
import "./pagestyle/pagestyle.css";

function MonthView() {
  const calendar = useCalendarApp({
    views: [createViewMonthGrid()],
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
        <MenuBar props="monthview" />
      </div>
    </div>
  );
}

export default MonthView;
