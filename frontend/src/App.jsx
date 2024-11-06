import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage.jsx";
import Sports from "./Pages/Sports.jsx";
import Technical from "./Pages/Technical.jsx";
import Cultural from "./Pages/Cultural.jsx";
import Acads from "./Pages/Acads.jsx";
import WeekView from "./Pages/WeekView.jsx";
import DayView from "./Pages/DayView.jsx";
import ERROR404 from "./Pages/ERROR404.jsx";
import MonthView from "./Pages/MonthView.jsx";
import ClubPage from "./Components/Clubpage.jsx";
import Pagedata from "./Pages/pagedata/PageData.jsx";

export default function App() {
  const all_event_pages = [];
  const Ai_club = <ClubPage id="TAIC" />;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dayview" element={<DayView />} />
          <Route path="/weekview" element={<WeekView />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/acads" element={<Acads />} />
          <Route path="/cultural" element={<Cultural />} />
          <Route path="/monthview" element={<MonthView />} />

          <Route path="/:clubId" element={<ClubPage />} />
          <Route path="*" element={<ERROR404 />} />
        </Routes>
      </Router>
    </div>
  );
}