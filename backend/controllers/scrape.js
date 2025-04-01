// getEvents.js
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

// Import the Event model directly
const Event = require('../models/Event');

const url = 'https://10times.com/india/waste-management/tradeshows';

const getEvents = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set a proper User-Agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36');

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Extract data for multiple events
    const eventsData = await page.evaluate(() => {
        const events = [];
        
        // Get today's date for comparison
        const today = new Date();

        // Helper function to parse the event date from string to Date object
        function parseEventDate(dateStr) {
            // Match date format (e.g., "Thu, 10 - Sat, 12 Apr 2025")
            const regex = /([A-Za-z]{3}),\s*(\d{1,2})\s*-\s*(\w+),\s*(\d{1,2})\s*(\w+)\s*(\d{4})/;
            const match = dateStr.match(regex);

            if (match) {
                const [, startDay, startDate, endDay, endDate, month, year] = match;
                
                // Construct a Date object for the first day of the event
                const eventDateStr = `${month} ${startDate}, ${year}`;
                const eventDate = new Date(eventDateStr);

                // Return the Date object for comparison
                return eventDate;
            }
            return null; // Return null if the date is invalid or cannot be parsed
        }

        // Loop through each event on the page
        const eventElements = document.querySelectorAll('.event-card');  // Assuming events are within elements with the class 'event-card'
        
        eventElements.forEach(eventElement => {
            const eventName = eventElement.querySelector('h2 span.text-decoration-none')?.innerText.trim();
            const eventDateStr = eventElement.querySelector('div[data-start-date]')?.innerText.trim();
            const location = eventElement.querySelector('div.venue a')?.innerText.trim();
            const description = eventElement.querySelector('div.text-wrap.text-break')?.innerText.trim();
            const eventLink = eventElement.querySelector('td.show-related')?.getAttribute('onclick')?.match(/window\.open\('([^']+)'\)/)?.[1];

            const categories = [];
            eventElement.querySelectorAll('td.small.text-muted-new span').forEach(el => {
                categories.push(el.innerText.trim());
            });

            // Clean up the categories (remove duplicates)
            const uniqueCategories = [...new Set(categories)];

            // Parse the event date to a Date object
            const eventDate = parseEventDate(eventDateStr);

            // If event has a name, is in the future, and other details, add it to the events list
            if (eventName && eventName !== '' && eventDate && eventDate >= today) {
                events.push({ eventName, eventDate: eventDateStr, location, description, categories: uniqueCategories, eventLink });
            }
        });

        return events;
    });

    console.log(`Scraped ${eventsData.length} events from 10times.com`);

    await browser.close();
    
    // Save events to the database directly
    const results = {
        total: eventsData.length,
        saved: 0,
        existing: 0,
        errors: 0
    };
    
    // Save each event to the database
    for (const eventData of eventsData) {
        try {
            // Check if event already exists
            const existingEvent = await Event.findOne({ eventLink: eventData.eventLink });
            
            if (existingEvent) {
                console.log(`Event "${eventData.eventName}" already exists in the database!`);
                results.existing++;
            } else {
                // Create and save new event
                const event = new Event(eventData);
                await event.save();
                console.log(`Event "${eventData.eventName}" saved successfully!`);
                results.saved++;
            }
        } catch (error) {
            console.error(`Error saving event "${eventData.eventName}":`, error);
            results.errors++;
        }
    }
    
    console.log(`Scraping results: Total: ${results.total}, Saved: ${results.saved}, Existing: ${results.existing}, Errors: ${results.errors}`);
    
    // Return both the events data and the results summary
    return { eventsData, results };
};

module.exports = {getEvents};