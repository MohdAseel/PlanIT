import React from "react";
import "./components.css";
import { SideBarData } from "./SideBarData";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="Sidebar">
      <h2>EVENTS BAR</h2>

      <div className="SidebarList">
        {SideBarData.map((val, key) => {
          return (
            <li key={key}>
              <NavLink to={val.link} className="title-nav">
                {val.title}
              </NavLink>
              {val.sublink ? (
                <div className="subtitle-li">
                  <ul>
                    {val.sublink.map((subval, subkey) => (
                      <li key={subkey}>
                        <NavLink to={subval.link} className="subtitle-nav">
                          {subval.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
      </div>
    </div>
  );
}
