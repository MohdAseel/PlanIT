import React, { useState, useEffect } from "react";
import MenuBarData from "./MenuBarData";
import { Link } from "react-router-dom";
import "./components.css";
import Overlay from "./Overlay";
import CreateEvent from "./CreateEvent";
import CheckboxMenu from "./CheckBoxMenu";

const MenuBar = (props) => {
  const currentPage = props.props;
  const [userEmail, setUserEmail] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const toggleEmailPopup = () => {
    setIsEmailPopupOpen(!isEmailPopupOpen);
  };

  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => setUserEmail(data.email))
      .catch(() => console.log("Failed to fetch user email"));
  }, []);

  const onCheckboxChange = (selection) => {
    console.log(selection);
  };

  return (
    <div className="MenuBar">
      <div className="user-profile">
        <img
          src="../../photos/icons_menu_bar/ic--round-account-box.svg"
          alt="Profile"
          style={{ cursor: "pointer" }}
          onClick={toggleEmailPopup} // Open the email popup
        />
      </div>
      <ul>
        {MenuBarData.map((item, key) => (
          <li key={key}>
            {currentPage === item.title ? null : (
              <Link to={item.link}>
                <img src={item.path} alt={item.title} />
              </Link>
            )}
          </li>
        ))}
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
            options={["Personal", "Technical", "Cultural", "Sports", "Academics"]}
            value={["Personal", "Technical", "Cultural", "Sports", "Academics"]}
            onChange={onCheckboxChange}
          />
        </li>
      </ul>

      {isEmailPopupOpen && (
        <div className="email-popup">
          <p>User Email: {userEmail}</p>
          <button onClick={toggleEmailPopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MenuBar;

/**
 * so now menubar is going to get props
 * to know which page it is display the function accordingly
 *
 */
