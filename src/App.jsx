import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sports from "./Pages/Sports";
import Technical from "./Pages/Technical";
import Cultural from "./Pages/Cultural";
import Acads from "./Pages/Acads";
import WeekView from "./Pages/weekview.jsx";
import Loginpagin from "./Pages/loginpagin.jsx";
import Sidebar from "./Components/SideBar.jsx";
export default function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />

        <Routes>
          <Route path="/" element={<Loginpagin />} />
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
