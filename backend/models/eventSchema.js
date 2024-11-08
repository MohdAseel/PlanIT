const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  clubId: { type: String, required: true },
  eventId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  startdate: { type: Date, required: true },
  enddate: { type: Date, required: true },
  location: { type: String },
  description: { type: String },
  image: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = eventSchema;
