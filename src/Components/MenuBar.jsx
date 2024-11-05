import React, { useState } from "react";
import MenuBarData from "./MenuBarData";
import { Link } from "react-router-dom";
import "./components.css";
import Overlay from "./Overlay";
import CreateEvent from "./CreateEvent";

import { Input } from "antd";

import CheckboxMenu from "./CheckBoxMenu";

const MenuBar = (props) => {
  const currentPage = props.props;
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  //<--for filter-->
  const onCheckboxChange = (selection) => {
    console.log(selection);
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
        {/* {
title: "addevent",
path: "../../photos/icons_menu_bar/basil--add-solid.svg",
link: "/addevent",
}, */}
        <li>
          <img
            src="../../photos/icons_menu_bar/basil--add-solid.svg"
            alt="addevent"
            onClick={toggleOverlay}
            script="cursor:pointer"
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
            onChange={onCheckboxChange}
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
