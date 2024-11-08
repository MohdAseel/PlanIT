import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './components/components.css';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateEvent from './components/CreateEvent';
import EventCard from './components/EventCard';

function App() {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Fetch events from backend
    useEffect(() => {
        axios.get('http://localhost:4000/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, [isSuccess]);

    // Open Create Event Modal
    const handleAddEvent = () => {
        setIsModalOpen(true);
    };

    // Close Create Event Modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsSuccess(false);
    };

    // Handle successful event addition
    const handleSuccess = () => {
        setIsSuccess(true);
        setIsModalOpen(false);
    };

    // Delete an event
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/events/${id}`)
            .then(response => {
                console.log('Event deleted successfully:', response.data);
                setIsSuccess(true);
            })
            .catch(error => {
                console.error('Error deleting event:', error);
            });
    };

    return (
        <Router>
            <div>
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container my-2">
                        <h4>GFG Event Dashboard</h4>
                        <div className="ml-auto">
                            <button
                                type="button"
                                className="btn btn-success mx-3"
                                onClick={handleAddEvent}
                            >
                                Add Event
                            </button>
                            <Link className="btn btn-primary" to="/">
                                Home
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<Home events={events} onDelete={handleDelete} />} />
                    {/* Add other routes like Update if needed */}
                </Routes>

                {/* Create Event Modal */}
                {isModalOpen && <CreateEvent onClose={handleCloseModal} onSuccess={handleSuccess} />}
            </div>
        </Router>
    );
}

export default App;
