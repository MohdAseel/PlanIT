import React from "react";
import MenuBarData from "./MenuBarData";
import { Link } from "react-router-dom";
import "./components.css";

const MenuBar = (props) => {
  const currentPage = props.props;

  console.log(typeof currentPage);
  return (
    <div className="MenuBar">
      <ul>
        {MenuBarData.map((item, index) => (
          <div key={index}>
            {console.log(typeof item.title)}
            {currentPage === item.title ? null : (
              <li>
                <Link to={item.link}>
                  <img src={item.path} alt={item.title} />
                </Link>
              </li>
            )}
          </div>
        ))}
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
