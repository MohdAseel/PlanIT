const eventSchema = require("../models/eventSchema.js");
const eventClassSchema = require("../models/acadevent.js");
const User = require("../models/user.js"); // Correctly import User model
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

const addEvent = async (req, res) => {
  try {
    const { email, eventId } = req.body;  // Assuming these are the fields sent in the request body
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.scheduled_events.includes(eventId)) {
      return res.status(400).json({ message: "Event already scheduled" });
    }

    user.scheduled_events.push(eventId);  // Add eventId to scheduled_events
    await user.save();

    res.status(201).json({
      message: "Event added to scheduled events",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createEvent,
  createClassEvent,
  getEventByClubId,
  createPersonalEvent,
  addEvent,
};
