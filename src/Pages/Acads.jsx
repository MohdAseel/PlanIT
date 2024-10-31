import React from "react";
import Sidebar from "../Components/Sidebar";
import MenuBar from "../Components/MenuBar";
import "./pagestyle/acadstyle.css";
import "./pagestyle/pagestyle.css";
function CardAcads(props) {
  return (
    <div className="card-acads">
      <div className="card-acad-title">
        <h2>{props.courseno}</h2>
        <h2>{props.time}</h2>
      </div>

      <h2 style={{ textAlign: "right" }}>{props.date}</h2>
      <h2>{props.location}</h2>
      <p>{props.desc}</p>
    </div>
  );
}

export default function Acads() {
  return (
    <div className="page-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <h1>Academics</h1>
        <div className="section">
          <div className="section-container">
            <h3>Upcoming Classes</h3>
            <div className="cards-container">
              <CardAcads
                courseno="CS 123"
                time="8:00 AM"
                date="Oct 30, 2024"
                location="Room 101"
                desc="Introduction to Computer Science"
              />
              <CardAcads
                courseno="CS 124"
                time="9:00 AM"
                date="Oct 30, 2024"
                location="Room 102"
                desc="Data Structures and Algorithms"
              />
              <CardAcads
                courseno="CS 125"
                time="10:00 AM"
                date="Oct 30, 2024"
                location="Room 103"
                desc="Operating Systems"
              />
              <CardAcads
                courseno="CS 126"
                time="11:00 AM"
                date="Oct 30, 2024"
                location="Room 104"
                desc="Software Engineering"
              />
              <CardAcads
                courseno="CS 127"
                time="12:00 PM"
                date="Oct 30, 2024"
                location="Room 105"
                desc="Database Management Systems"
              />
            </div>
          </div>
        </div>
        <div className="section">
          <div className="section-container">
            <h3>Assignments</h3>
            <div className="cards-container">
              <CardAcads
                courseno="CS 123"
                time="8:00 AM"
                date="Oct 30, 2024"
                location="Room 101"
                desc="Introduction to Computer Science"
              />
              <CardAcads
                courseno="CS 124"
                time="9:00 AM"
                date="Oct 30, 2024"
                location="Room 102"
                desc="Data Structures and Algorithms"
              />
              <CardAcads
                courseno="CS 125"
                time="10:00 AM"
                date="Oct 30, 2024"
                location="Room 103"
                desc="Operating Systems"
              />
              <CardAcads
                courseno="CS 126"
                time="11:00 AM"
                date="Oct 30, 2024"
                location="Room 104"
                desc="Software Engineering"
              />
              <CardAcads
                courseno="CS 127"
                time="12:00 PM"
                date="Oct 30, 2024"
                location="Room 105"
                desc="Database Management Systems"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="menubar-container">
        <MenuBar />
      </div>
    </div>
  );
}
