const eventSchema = require("../models/eventSchema.js");
const eventClassSchema = require("../models/acadevent.js");
const User = require("../models/User.js"); // Correctly import User model
const mongoose = require("mongoose");

const createEvent = async (req, res) => {
  try {
    const { title, description, startdate, enddate, location } = req.body;
    const Event = mongoose.model(
      req.params.clubId,
      eventSchema,
      req.params.clubId
    ); // force the model to use the clubId as the collection name
    const event = new Event({
      title: title,
      description: description,
      startdate: startdate,
      enddate: enddate,
      clubId: req.params.clubId,
      location: location,
    });
    let sphere = req.params.clubId.charAt(0);
    if (sphere === "T") {
      sphere = "technical";
    } else if (sphere === "c") {
      sphere = "cultural";
    } else if (sphere === "s") {
      sphere = "sports";
    } else {
      return res.status(400).json({
        error: "Enter a valid club",
      });
    }
    const collectionName = sphere;
    const EventCollection = mongoose.connection.collection(collectionName);
    const clubdata = await EventCollection.findOne({
      clubId: req.params.clubId,
    });

    const lengthe = clubdata.eventId.length + 1;
    const newId = clubdata.clubId + lengthe.toString().padStart(4, "0");

    event.eventId = newId;

    await event.save();
    res.status(201).json(event);
    await EventCollection.updateOne(
      { clubId: req.params.clubId },
      { $push: { eventId: newId } }
    );
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createClassEvent = async (req, res) => {
  try {
    const {
      classname,
      courseno,
      class_assignment,
      description,
      startdate,
      enddate,
      location,
    } = req.body;
    const EventClass = mongoose.model(classname, eventClassSchema, classname); // force the model to use the clubId as the collection name
    const eventclass = new EventClass({
      courseno: courseno,
      class_assignment: class_assignment,
      startdate: startdate,
      enddate: enddate,
      description: description,
      location: location,
    });
    console.log(eventclass);
    await eventclass.save();
    res.status(201).json(eventclass);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createPersonalEvent = async (req, res) => {
  try {
    const { email, title, description, startdate, enddate } = req.body;
    console.log(req.body);
    // Find the user by email instead of clubId
    console.log(email);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const personalEvent = {
      title: title,
      description: description,
      startdate: startdate,
      enddate: enddate,
    };

    user.personal_events.push(personalEvent);
    await user.save();

    res.status(201).json(personalEvent);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get all events
// Get a single event by ID
const getEventByClubId = async (req, res) => {
  try {
    const Event = mongoose.model(
      req.params.clubId,
      eventSchema,
      req.params.clubId
    );
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update an event by ID
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, location } = req.body;
    const event = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
        location,
      },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      // error: error.message,
    });
  }
};

const getEventDetailsByIds = async (req, res) => {
  try {
    let { eventIds } = req.body; // Extract event IDs from query string

    if (!eventIds) {
      return res.status(400).json({ message: "No event IDs provided" });
    }
    let eventDetails = []; // Array to store event details
    // Loop through each event ID
    for (const eventId of eventIds) {
      const clubId = eventId.substring(0, 4); // Get the first 4 characters as clubId

      try {
        // Dynamically define the EventModal for the specific club collection
        const EventModal = mongoose.model(clubId, eventSchema, clubId);

        // Fetch event details based on the event ID for this club's collection
        const event = await EventModal.findOne({ eventId: eventId });

        if (event) {
          eventDetails.push(event); // Add the event to the result array if found
        } else {
          console.warn(
            `Event not found for event ID: ${eventId} in club ${clubId}`
          );
        }
      } catch (err) {
        console.error(
          `Error fetching event with ID ${eventId} from club ${clubId}:`,
          err
        );
        continue; // Continue with other event IDs in case of error
      }
    }

    if (eventDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for the provided IDs" });
    }

    // Send the event details as the response
    res.status(200).json(eventDetails);
  } catch (err) {
    console.error("Error fetching event details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to fetch event IDs based on email
const getEventIdsByEmail = async (req, res) => {
  try {
    // Retrieve the user's email from query params
    const email = req.query.email;
    console.log(email);

    const user = await User.findOne({ email }); // Find the user by email

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return the event IDs stored in the user's Scheduled_events
    const eventIds = user.scheduled_events;
    const personal_events = user.personal_events;

    res.status(200).json({ eventIds, personal_events });
  } catch (err) {
    console.error("Error fetching event IDs:", err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createEvent,
  createClassEvent,
  getEventByClubId,
  createPersonalEvent,
  getEventDetailsByIds,
  getEventIdsByEmail,
};
