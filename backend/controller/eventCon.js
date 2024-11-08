const eventSchema = require("../models/eventSchema.js");
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
    console.log(clubdata);
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
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
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
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
