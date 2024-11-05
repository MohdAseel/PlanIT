import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage.jsx";
import Sports from "./Pages/Sports";
import Technical from "./Pages/Technical";
import Cultural from "./Pages/Cultural";
import Acads from "./Pages/Acads";
import WeekView from "./Pages/WeekView.jsx";
import DayView from "./Pages/DayView.jsx";
import ERROR404 from "./Pages/ERROR404.jsx";
import MonthView from "./Pages/MonthView.jsx";
<<<<<<< HEAD
import ClubPage from "./Components/Clubpage.jsx";
=======
import ClubPage from "./Components/clubpage.jsx";
import Pagedata from "./Pages/pagedata/PageData.jsx";
>>>>>>> 2099bd6182e1c20ea97457594150d05060a0e8f1

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
