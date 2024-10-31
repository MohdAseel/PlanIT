import React from "react";
import SideBar from "../Components/Sidebar";
import MenuBar from "../Components/MenuBar";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewWeek } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/calendar.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import "./pagestyle/calendarpagestyle.css";
import "./pagestyle/pagestyle.css";

function WeekView() {
  const calendar = useCalendarApp({
    views: [createViewWeek()],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2024-10-27 00:00",
        end: "2024-10-27 00:30",
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
        <MenuBar props="weekview" />
      </div>
    </div>
  );
}

export default WeekView;
