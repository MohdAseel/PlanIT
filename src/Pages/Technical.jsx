import React from "react";
import Sidebar from "../Components/Sidebar";
import MenuBar from "../Components/MenuBar";
import "./pagestyle/pagestyle.css";
import PagedataFetcher from "./pagedata/PageData";
import Clubcards from "../Components/clubcards";

export default function Technical() {
  const technicalData = PagedataFetcher({ sphere: "Technical" });

  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>Technical</h1>
        <p style={{ textAlign: "center" }}>All the insti technical stuff</p>
        <Clubcards data={technicalData} />
      </div>
      <div className="menubar-container">
        <MenuBar />
      </div>
    </div>
  );
}
