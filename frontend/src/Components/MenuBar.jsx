import React, { useState } from "react";
import { Link } from "react-router-dom";
import Overlay from "./Overlay";
import CreateEvent from "./CreateEvent";
import CheckboxMenu from "./CheckBoxMenu";
import { Input } from "antd";

import "./components.css";

const MenuBar = ({ onCheckboxChange, currentPage }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const onCheckboxChangeMenu = (selection) => {
    onCheckboxChange(selection); // Call the onCheckboxChange function passed from the parent
  };

  return (
    <div className="MenuBar">
      <ul>
        <li>
          <Link to={"/profile"}>
            <img
              src="../../photos/icons_menu_bar/ic--round-account-box.svg"
              alt="profile"
              //overlay for account
            />
          </Link>
        </li>
        {/* if its montview we dont want the link for it  */}
        {currentPage === "monthview" ? (
          <>
            <li>
              <Link to={"/weekview"}>
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-week.svg"
                  alt="weekview"
                />
              </Link>
            </li>
            <li>
              <Link to={"/dayview"}>
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-day.svg"
                  alt="dayview"
                />
              </Link>
            </li>
          </>
        ) : null}
        {currentPage === "weekview" ? (
          <>
            <li>
              <Link to={"/monthview"}>
                <img
                  src="../../photos/icons_menu_bar/material-symbols-light--calendar-view-month.svg"
                  alt="monthview"
                />
              </Link>
            </li>
            <li>
              <Link to={"/dayview"}>
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-day.svg"
                  alt="dayview"
                />
              </Link>
            </li>
          </>
        ) : null}
        {currentPage === "dayview" ? (
          <>
            <li>
              <Link to={"/monthview"}>
                <img
                  src="../../photos/icons_menu_bar/material-symbols-light--calendar-view-month.svg"
                  alt="monthview"
                />
              </Link>
            </li>
            <li>
              <Link to={"/weekview"}>
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-week.svg"
                  alt="weekview"
                />
              </Link>
            </li>
          </>
        ) : null}
        {currentPage === "monthview" ||
        currentPage === "dayview" ||
        currentPage === "weekview" ? (
          <>
            <li>
              <img
                src="../../photos/icons_menu_bar/basil--add-solid.svg"
                alt="addevent"
                onClick={toggleOverlay}
                style={{ cursor: "pointer" }}
              />
              <Overlay isOpen={isOverlayOpen} onClose={toggleOverlay}>
                <CreateEvent isOpen={isOverlayOpen} onClose={toggleOverlay} />
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
                onChange={onCheckboxChangeMenu} // Pass the onCheckboxChangeMenu function
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/dayview"}>
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-day.svg"
                  alt="dayview"
                />
              </Link>
            </li>
            <li>
              <Link to={"/weekview"}>
                <img
                  src="../../photos/icons_menu_bar/material-symbols--view-week.svg"
                  alt="weekview"
                />
              </Link>
            </li>
            <li>
              <Link to={"/monthview"}>
                <img
                  src="../../photos/icons_menu_bar/material-symbols-light--calendar-view-month.svg"
                  alt="monthview"
                />
              </Link>
            </li>
          </>
        )}
        <li></li>
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
