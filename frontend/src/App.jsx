import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./Components/EventCard.jsx";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
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
import DataProvider from "./context/DataProvider.jsx";
const PrivateRoute = ({ isUserAuthenticated, ...props }) => {
  return isUserAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Logic to check if user is authenticated
    setIsAuthenticated(true); // Example: set to true for now
  }, []);

  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage isUserAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/"
            element={<PrivateRoute isUserAuthenticated={isAuthenticated} />}
          >
            <Route path="/dayview" element={<DayView />} />
            <Route path="/weekview" element={<WeekView />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/technical" element={<Technical />} />
            <Route path="/acads" element={<Acads />} />
            <Route path="/cultural" element={<Cultural />} />
            <Route path="/monthview" element={<MonthView />} />
            <Route path="/:clubId" element={<ClubPage />} />
            <Route path="/*" element={<ERROR404 />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
