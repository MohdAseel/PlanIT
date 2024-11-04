const mongoose = require('mongoose');

const userEventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    addedAt: { type: Date, default: Date.now }
  });
  
  const UserEvent = mongoose.model('UserEvent', userEventSchema);
  module.exports = UserEvent;