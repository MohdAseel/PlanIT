import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClubData from "./ClubData";
import Sidebar from "./Sidebar";
import MenuBar from "./MenuBar";
import "../Pages/pagestyle/pagestyle.css";
import EventCard from "./EventCard";

function ClubPage() {
    const { clubId } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState([]);

    const data = ClubData.find((data_club) => data_club.id === clubId);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`http://localhost:5000/${clubId}`);
                console.log(response);
                const events = await response.json();
                setEventData(events);
            } catch (err) {
                console.error("Error fetching events:", err);
            }
        };
        fetchEvents();
    }, [clubId]);

    if (!data) {
        return (
            <>
                <h1>Data not found</h1>
                <button onClick={() => navigate(-1)}>Back</button>
            </>
        );
    }

    return (
        <div className="page-container">
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="main-content">
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                <div className="event-card-container">
                    {eventData.map((event) => (
                        <EventCard key={event._id} data={event} />
                    ))}
                </div>
            </div>
            <div className="menubar-container">
                <MenuBar props="dayview" />
            </div>
        </div>
    );
}

export default ClubPage;

