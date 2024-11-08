const mongoose = require("mongoose");

// Define the schema for a single personal event
const PersonalEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startdate: { type: Date, required: true },
  enddate: { type: Date, required: true },
  description: { type: String },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" },
  classname: { type: String, default: "CSE" },
  personal_events: { type: [PersonalEventSchema], default: [] }, // Changed to array
  scheduled_events: { type: [String], default: [] },
  starred_clubs: { type: [String], default: [] },
});

const User = mongoose.model("User", UserSchema, "User");
module.exports = User;
