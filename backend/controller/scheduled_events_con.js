// import { DataContext } from "../context/DataProvider";
// import {useContext} from 'react';
// const { setAccount } = useContext(DataContext);

const mongoose = require("mongoose");
const eventSchema = require("../models/eventSchema");

// Controller to fetch event details based on event IDs
const getEventDetailsByIds = async (req, res) => {
  try {
    const { eventIds } = req.query; // Extract event IDs from query string

    if (!eventIds) {
      return res.status(400).json({ message: "No event IDs provided" });
    }

    const eventIdArray = eventIds.split(","); // Convert comma-separated event IDs into an array
    const eventDetails = [];

    // Loop through each event ID
    for (const eventId of eventIdArray) {
      const clubId = eventId.substring(0, 4); // Get the first 4 characters as clubId

      try {
        // Dynamically define the EventModal for the specific club collection
        const EventModal = mongoose.model(clubId, eventSchema, clubId);

        // Fetch event details based on the event ID for this club's collection
        const event = await EventModal.findOne({ eventId: eventId });

        if (event) {
          eventDetails.push(event); // Add the event to the result array if found
        } else {
          console.warn(`Event not found for event ID: ${eventId} in club ${clubId}`);
        }
      } catch (err) {
        console.error(`Error fetching event with ID ${eventId} from club ${clubId}:`, err);
        continue; // Continue with other event IDs in case of error
      }
    }

    if (eventDetails.length === 0) {
      return res.status(404).json({ message: "No events found for the provided IDs" });
    }

    // Send the event details as the response
    res.status(200).json(eventDetails);
  } catch (err) {
    console.error("Error fetching event details:", err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports={ getEventDetailsByIds };
