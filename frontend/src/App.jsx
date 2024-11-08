import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { UserProvider } from "./UserContext"; // Import UserProvider
import DataProvider from "./context/DataProvider.jsx";
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
import "./App.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoute to protect routes that require authentication
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate replace to="/login" />;
  };

  return (
    <DataProvider>
      <UserProvider>
        <Router>
          <Routes>
            {/* Public route */}
            <Route
              path="/login"
              element={<LoginPage isUserAuthenticated={setIsAuthenticated} />}
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Outlet />
                </PrivateRoute>
              }
            >
              <Route path="/dayview" element={<DayView />} />
              <Route path="/weekview" element={<WeekView />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/technical" element={<Technical />} />
              <Route path="/acads" element={<Acads />} />
              <Route path="/cultural" element={<Cultural />} />
              <Route path="/monthview" element={<MonthView />} />
              <Route path="/:clubId" element={<ClubPage />} />
              <Route path="*" element={<ERROR404 />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </DataProvider>
  );
}
