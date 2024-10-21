import react from "react";
import SideBar from "./assets/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sports from "./Pages/Sports";
import Technical from "./Pages/Technical";
import Cultural from "./Pages/Cultural";
import Acads from "./Pages/Acads";
import Home3DayView from "./Pages/home-3-dayview";

function App() {
  return (
    <Router>
      <div>
        <SideBar />
      </div>
      <Routes>
        <Route path="/sports" element={<Sports />} />
        <Route path="/technical" element={<Technical />} />
        <Route path="/cultural" element={<Cultural />} />
        <Route path="/acads" element={<Acads />} />
        <Route path="/" element={<Home3DayView />} />
      </Routes>
    </Router>
  );
}

export default App;
