import React from "react";
import "./components.css";
import { Link } from "react-router-dom";

const Clubcards = (props) => {
  // props contain array of objects with title and data format
  // data has an array of club objects with title and link
  const data = props.data;

  return (
    <div className="card-whole-container">
      {data.map((club, key) => {
        return (
          <div className="card-container" key={key}>
            <div className="card-title">{club.title}</div>
            <div className="card-data">
              <ul>
                {club.data.map((club, key) => {
                  return (
                    <li key={key} className="club-card">
                      <Link to={club.link} className="club-card-title">
                        {club.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Clubcards;
