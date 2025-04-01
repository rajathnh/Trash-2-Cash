// models/Event.js

const mongoose = require('mongoose');

// Define the schema for event data
const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false, // Optional, depending on your needs
    },
    categories: {
        type: [String],
        required: true,
    },
    eventLink: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the model from the schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
