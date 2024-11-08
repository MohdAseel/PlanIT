const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  clubId: { type: String, required: true },
  clubname: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  eventId: { type: Array },
});

const ClubModal = mongoose.model("technical", clubSchema, "technical");

module.exports = ClubModal;
