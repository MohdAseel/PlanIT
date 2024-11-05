import React, { useState } from "react";
import { Link } from "react-router-dom";
import Overlay from "./Overlay";
import CreateEvent from "./CreateEvent";
import CheckboxMenu from "./CheckBoxMenu";
import MenuBarData from "./MenuBarData";
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
        {MenuBarData.map((item, key) => (
          <div key={key}>
            {currentPage === item.title ? null : (
              <li>
                <Link to={item.link}>
                  <img src={item.path} alt={item.title} />
                </Link>
              </li>
            )}
          </div>
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
            options={[
              "Personal",
              "Technical",
              "Cultural",
              "Sports",
              "Academics",
            ]}
            value={["Personal", "Technical", "Cultural", "Sports", "Academics"]}
            onChange={onCheckboxChangeMenu} // Pass the onCheckboxChangeMenu function
          />
        </li>
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
