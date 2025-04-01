import React, { useEffect, useState } from 'react';
import './EventsPage.css';
const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/event'); // Update with your actual backend URL
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="events-container">
            <h2>Upcoming Waste Management Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <h3>{event.eventName}</h3>
                        <p><strong>Date:</strong> {event.eventDate}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Description:</strong> {event.description}</p>
                        <a href={event.eventLink} target="_blank" rel="noopener noreferrer">View Details</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsPage;
