import React, { useEffect, useState, useContext } from "react";
import "./components.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { SideBarData } from "./SideBarData"; // Ensure correct import path
import { DataContext } from "../context/DataProvider"; // Import your context

export default function Sidebar() {
  const { account } = useContext(DataContext); // Accessing account from DataContext

  const [latestEvents, setLatestEvents] = useState([]);
  const [starredClubs, setStarredClubs] = useState([]);
  const [errorEvents, setErrorEvents] = useState(null); // Separate error state for events
  const [errorClubs, setErrorClubs] = useState(null);   // Separate error state for clubs
  const [loadingEvents, setLoadingEvents] = useState(true); // Loading state for events
  const [loadingClubs, setLoadingClubs] = useState(true); // Loading state for clubs

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch Latest Events
    const fetchLatestEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/latest-events");
        if (response.data && Array.isArray(response.data.events)) {
          setLatestEvents(response.data.events);
        } else {
          setLatestEvents([]);
        }
      } catch (error) {
        console.error("Error fetching latest events:", error);
        setErrorEvents("Unable to load latest events.");
      } finally {
        setLoadingEvents(false);
      }
    };

    // Fetch Starred Clubs
    const fetchStarredClubs = async () => {
      try {
        if (!account || !account.email) {
          throw new Error("User not authenticated.");
        }

        const response = await axios.get(`http://localhost:8000/starred-clubs/${account.email}`);
        if (response.data && Array.isArray(response.data.starred_clubs)) {
          setStarredClubs(response.data.starred_clubs);
          console.log(starredClubs);
        } else {
          setStarredClubs([]);
        }
      } catch (error) {
        console.error("Error fetching starred clubs:", error);
        setErrorClubs(error.response?.data?.message || "Unable to load starred clubs.");
      } finally {
        setLoadingClubs(false);
      }
    };

    fetchLatestEvents();
    fetchStarredClubs();
  }, [account.email]); // Dependency array includes account.email

  const handleEventClick = (event) => {
    // Navigate to the event detail page
    navigate(`/event/${event.eventId}`);
  };

  const handleClubClick = (clubId) => {
    navigate(`/${clubId}`);
  };

  return (
    <div className="Sidebar">
      <h2>EVENTS BAR</h2>

      <div className="SidebarList">
        {/* Latest Events Section */}
        <li>
          <h1 className="title-nav" style={{ textAlign: "left" }}>
            Latest Events
          </h1>
          <div className="subtitle-li">
            <ul>
              {loadingEvents && <li>Loading events...</li>}
              {errorEvents && <li className="error">{errorEvents}</li>}
              {!loadingEvents && latestEvents.length > 0 ? (
                latestEvents.map((event, index) => (
                  <li key={event.eventId}>
                    <button
                      className="subtitle-nav event-button"
                      onClick={() => handleEventClick(event)}
                    >
                      {`Latest Event ${index + 1}: ${event.title}`}
                    </button>
                  </li>
                ))
              ) : (
                !loadingEvents && <li>No upcoming events.</li>
              )}
            </ul>
          </div>
        </li>

        {/* Starred Clubs Section */}
        <li>
          <h1 className="title-nav" style={{ textAlign: "left" }}>
            Starred Clubs
          </h1>
          <div className="subtitle-li">
            <ul>
              {loadingClubs && <li>Loading starred clubs...</li>}
              {errorClubs && <li className="error">{errorClubs}</li>}
              {!loadingClubs && starredClubs.length > 0 ? (
                starredClubs.map((club, index) => (
                  <li key={index}>
                    <NavLink key={index}
                      className="subtitle-nav"
                      to={`/${club}`}
                    >
                      {`Starred Club ${index + 1}: ${club}`}
                    </NavLink>
                  </li>
                ))
              ) : (
                !loadingClubs && <li>No starred clubs.</li>
              )}
            </ul>
          </div>
        </li>

        {/* Static Sidebar Items */}
        {SideBarData.map((item, index) => (
          <li key={index}>
            <NavLink to={item.link} className="title-nav">
              {item.title}
            </NavLink>
            {item.sublink && (
              <div className="subtitle-li">
                <ul>
                  {item.sublink.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink to={subItem.link} className="subtitle-nav">
                        {subItem.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}

        {/* Add other sidebar sections/items as needed */}
      </div>
    </div>
  );
}
