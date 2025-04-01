// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const {getEvents}= require('../controllers/scrape');
const Event = require('../models/Event');

// Route to trigger scraping and saving events
router.get('/scrape', async (req, res) => {
    try {
        const { eventsData, results } = await getEvents();
        res.json({
            message: 'Scraping completed successfully',
            results: results
        });
    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).json({ 
            message: 'Error during scraping process',
            error: error.message 
        });
    }
});

// Route to get all events from database as JSON
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ eventDate: 1 });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ 
            message: 'Error fetching events',
            error: error.message 
        });
    }
});

// Route to get a specific event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ 
            message: 'Error fetching event',
            error: error.message 
        });
    }
});

module.exports = router;