import React from "react";
import ClubData from "./ClubData";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import MenuBar from "./MenuBar";
import "../Pages/pagestyle/pagestyle.css";

const ClubPage = () => {
  //this is dynamic render for each clubs on page with a click
  //the link bar will contain a unique club id which will be used to fech data from the backend
  //fetch data from backend using the club id
  // as there is no backend we fecth it from a data file

  const clubid = props.clubid;
  console.log(clubid);
  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>{clubid}</h1>
      </div>
      <div className="menubar-container">
        <MenuBar props="dayview" />
      </div>
    </div>
  );
};

export default ClubPage;
