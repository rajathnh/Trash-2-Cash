import React, { useEffect, useState } from 'react';
import './EventsPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaCalendarAlt, FaMapMarkerAlt, FaLeaf, FaRegClock, FaUsers } from 'react-icons/fa';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/event`); // Update with your actual backend URL
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

  const formatEventDate = (dateString) => {
    if (!dateString) return 'Date to be announced';
    const date = new Date(dateString);
    return isNaN(date) ? 'Date to be announced' : 
      date.toLocaleDateString('en-US', {
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
  };

  return (
    <>
      <Navbar hideGetStarted={true} disableSlide={true} />
      <div className="events-page">
        <div className="events-container">
          <div className="events-header">
            <h1 className="events-main-title">Eco Events Hub</h1>
            <p className="events-subtitle">Sustainable Waste Management Initiatives</p>
          </div>
          
          <div className="events-content">
            {events.map((event) => (
              <article key={event._id} className="event-card">
                <div className="event-card-header">
                  <div className="event-type">
                    <FaLeaf className="event-type-icon" />
                    <span className="event-status">Upcoming</span>
                  </div>
                  <div className="event-meta">
                    <span className="event-participants">
                      <FaUsers className="meta-icon" />
                      {event.participants || '100+'} participants
                    </span>
                  </div>
                </div>
                
                <div className="event-card-body">
                  <h3 className="event-title">{event.eventName}</h3>
                  <div className="event-details">
                    <div className="detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <span>{formatEventDate(event.eventDate)}</span>
                    </div>
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span>{event.location || 'Virtual Event'}</span>
                    </div>
                  </div>
                  <p className="event-description">
                    {event.description || 'Join us for an impactful waste management initiative. Details coming soon!'}
                  </p>
                </div>
                
                <div className="event-card-footer">
                  <a
                    href={event.eventLink || '#'}
                    className="event-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {event.eventLink ? 'Register Now' : 'Learn More'}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default EventsPage;