import React from "react";
import "../app.css";
import link from "react-router-dom";

export default function SideBar() {
  return (
    <div className="sidebar">
      <h2>EVENTS BAR</h2>
      <p className="section-title">Whats New?</p>
      Recent Event 1<br />
      Recent Event 2<br />
      Recent Event 3<br />
      <p className="section-title">Starred</p>
      Starred club 1<br />
      Starred club 2<br />
      Starred club 3<br />
      <p className="section-title">
        <Link to="/Acads">Acads</Link>
      </p>
      <p className="section-title">
        <Link to="/Technical">Technical</Link>
      </p>
      <p className="section-title">
        <Link to="/Cultural">Cultural</Link>
      </p>
      <p className="section-title">
        <Link to="/Sports">Sports</Link>
      </p>
    </div>
  );
}
