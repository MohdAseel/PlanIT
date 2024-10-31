import React from "react";
import Sidebar from "../Components/Sidebar";
import MenuBar from "../Components/MenuBar";
import "./pagestyle/pagestyle.css";
import PagedataFetcher from "./pagedata/PageData";
import Clubcards from "../Components/clubcards";

export default function Cultural() {
  const culturalData = PagedataFetcher({ sphere: "Cultural" });

  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>Cultural</h1>
        <p style={{ textAlign: "center" }}>All the insti Cultural stuff</p>
        <Clubcards data={culturalData} />
      </div>
      <div className="menubar-container">
        <MenuBar />
      </div>
    </div>
  );
}
