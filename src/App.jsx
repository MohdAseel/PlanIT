import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sports from "./Pages/Sports";
import Technical from "./Pages/Technical";
import Cultural from "./Pages/Cultural";
import Acads from "./Pages/Acads";
import WeekView from "./Pages/weekview.jsx";
import LoginPage from "./Pages/LoginPage.jsx";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/weekview" element={<WeekView />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/acads" element={<Acads />} />
          <Route path="/cultural" element={<Cultural />} />
        </Routes>
      </Router>
    </div>
  );
}
