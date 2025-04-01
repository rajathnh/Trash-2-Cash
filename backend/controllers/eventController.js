const Event = require('./models/Event');

const saveEventData = async (eventData) => {
    try {
        // Check if event already exists by unique identifier (e.g., eventLink or eventName)
        const existingEvent = await Event.findOne({ eventLink: eventData.eventLink });

        if (existingEvent) {
            console.log('Event already exists in the database!');
        } else {
            // If not, save the new event
            const event = new Event(eventData);
            await event.save();
            console.log('Event saved successfully!');
        }
    } catch (error) {
        console.error('Error saving event:', error);
    }
};

// Example event data (this would be from your scraper)

module.exports = saveEventData;

