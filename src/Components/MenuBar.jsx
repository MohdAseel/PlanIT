import React from "react";
import MenuBarData from "./MenuBarData";
import "./components.css";

const MenuBar = () => {
  return (
    <div className="MenuBar">
      <ul>
        {MenuBarData.map((item, index) => (
          <li key={index}>
            <img src={item.path} alt={item.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuBar;
