const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // role: { type: String, enum: ['admin', 'student'], required: true },
  password: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now }
  role: { type: String, default: "student" },
  class: { type: String, default: "CSE" },
  P_events: { type: Object, default: {} },
  S_events: { type: Array, default: [] },
});

const UserModal = mongoose.model("users", UserSchema);
module.exports = UserModal;
