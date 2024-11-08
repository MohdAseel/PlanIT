const mongoose = require("mongoose");

const eventClassSchema = new mongoose.Schema({
  courseno: { type: String, required: true },
  class_assignment: { type: String, required: true },
  startdate: { type: Date, required: true },
  enddate: { type: Date, required: true },
  location: { type: String },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = eventClassSchema;
