import React from "react";
import Sidebar from "../Components/Sidebar";
import MenuBar from "../Components/MenuBar";
import "./pagestyle/pagestyle.css";
import PagedataFetcher from "./pagedata/PageData";
import Clubcards from "../Components/clubcards";

export default function Sports() {
  const sportsData = PagedataFetcher({ sphere: "Sports" });

  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>Sports</h1>
        <p>All the insti sports stuff</p>
        <Clubcards data={sportsData} />
      </div>
      <div className="menubar-container">
        <MenuBar />
      </div>
    </div>
  );
}
