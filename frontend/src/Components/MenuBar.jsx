import React, { useState } from "react";
import { Link } from "react-router-dom";
import Overlay from "./Overlay";
import CreatePersonalEvent from "./CreatePersonalEvent";
import CheckboxMenu from "./CheckBoxMenu";
import ProfilePictureOverlay from "./ProfilePictureOverlay";
import { Input } from "antd";

import "./components.css";

const MenuBar = ({ onCheckboxChange, currentPage }) => {
  // State for managing overlay visibility
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isProfileOverlayOpen, setIsProfileOverlayOpen] = useState(false);

  // Toggle the overlay visibility
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
    setIsProfileOverlayOpen(false); // Close profile overlay when creating a personal event
  };

  // Toggle the profile picture overlay visibility
  const toggleProfileOverlay = () => {
    setIsProfileOverlayOpen(!isProfileOverlayOpen);
    setIsOverlayOpen(false); // Close create personal event overlay when viewing profile picture
  };

  // Handles checkbox changes, passed to CheckBoxMenu component
  const handleCheckboxChangeMenu = (selection) => {
    if (onCheckboxChange) {
      onCheckboxChange(selection); // Call the onCheckboxChange passed from the parent component
    }
  };

  return (
    <div className="MenuBar">
      <ul>
        {/* Profile picture icon with toggleable overlay */}
        <li>
          <img
            src="../../photos/icons_menu_bar/ic--round-account-box.svg"
            alt="profile"
            onClick={toggleProfileOverlay}
            style={{ cursor: "pointer" }}
          />
          <Overlay isOpen={isProfileOverlayOpen} onClose={toggleProfileOverlay}>
            <ProfilePictureOverlay
              isOpen={isProfileOverlayOpen}
              onClose={toggleProfileOverlay}
            />
          </Overlay>
        </li>

        {/* Navigation for different views based on currentPage */}
        {currentPage === "monthview" && (
          <>
            <li>
              <Link to="/weekview">
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-week.svg"
                  alt="weekview"
                />
              </Link>
            </li>
            <li>
              <Link to="/dayview">
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-day.svg"
                  alt="dayview"
                />
              </Link>
            </li>
          </>
        )}

        {currentPage === "weekview" && (
          <>
            <li>
              <Link to="/monthview">
                <img
                  src="../../photos/icons_menu_bar/material-symbols-light--calendar-view-month.svg"
                  alt="monthview"
                />
              </Link>
            </li>
            <li>
              <Link to="/dayview">
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-day.svg"
                  alt="dayview"
                />
              </Link>
            </li>
          </>
        )}

        {currentPage === "dayview" && (
          <>
            <li>
              <Link to="/monthview">
                <img
                  src="../../photos/icons_menu_bar/material-symbols-light--calendar-view-month.svg"
                  alt="monthview"
                />
              </Link>
            </li>
            <li>
              <Link to="/weekview">
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-week.svg"
                  alt="weekview"
                />
              </Link>
            </li>
          </>
        )}

        {/* Render options if on a valid view page */}
        {(currentPage === "monthview" ||
          currentPage === "weekview" ||
          currentPage === "dayview") && (
          <>
            <li>
              <img
                src="../../photos/icons_menu_bar/basil--add-solid.svg"
                alt="addevent"
                onClick={toggleOverlay}
                style={{ cursor: "pointer" }}
              />
              <Overlay isOpen={isOverlayOpen} onClose={toggleOverlay}>
                <CreatePersonalEvent
                  isOpen={isOverlayOpen}
                  onClose={toggleOverlay}
                />
              </Overlay>
            </li>
            <li>
              <CheckboxMenu
                options={[
                  "Personal",
                  "Technical",
                  "Cultural",
                  "Sports",
                  "Academics",
                ]}
                value={[
                  "Personal",
                  "Technical",
                  "Cultural",
                  "Sports",
                  "Academics",
                ]}
                onChange={handleCheckboxChangeMenu} // Pass the function to handle checkbox change
              />
            </li>
          </>
        )}

        {/* Render navigation links if not on a valid view page */}
        {!["monthview", "weekview", "dayview"].includes(currentPage) && (
          <>
            <li>
              <Link to="/dayview">
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-day.svg"
                  alt="dayview"
                />
              </Link>
            </li>
            <li>
              <Link to="/weekview">
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-week.svg"
                  alt="weekview"
                />
              </Link>
            </li>
            <li>
              <Link to="/monthview">
                <img
                  src="../../photos/icons_menu_bar/material-symbols-light--calendar-view-month.svg"
                  alt="monthview"
                />
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MenuBar;


/**
 * so now menubar is going to get props
 * to know which page it is display the function accordingly
 *
 */

/**
 * so now menubar is going to get props
 * to know which page it is display the function accordingly
 *
 */
