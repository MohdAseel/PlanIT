const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // role: { type: String, enum: ['admin', 'student'], required: true },
  password: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now }
  role: { type: String, default: "student" },
  class: { type: String, default: "CSE" },
  Personal_events: {
    type: Object,
    default: {
      clubId: { type: String, required: true },
      id: { type: String, required: true },
      title: { type: String, required: true },
      date: { type: Date, required: true },
      time: { type: String },
      location: { type: String },
      description: { type: String },
      image: { type: String },
    },
  },
  Scheduled_events: { type: Array, default: [] },
  Starred_clubs: { type: Array, default: [] },
});

const UserModal = mongoose.model("users", UserSchema);
module.exports = UserModal;
