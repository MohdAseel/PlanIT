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
  personal_events: {
    type: [PersonalEventSchema],
    default: [
      {
        title: "joined plainIT",
        startdate: new Date(),
        enddate: new Date(),
        description: "This is a sample event.",
      },
    ],
  }, // Changed to array
  scheduled_events: { type: [String], default: ["TAIC0001"] },
  starred_clubs: { type: [String], default: [] },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
