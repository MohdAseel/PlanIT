const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    clubId: { type: String, required: true },
    id: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String },
    location: { type: String },
    description: { type: String },
    image: { type: String } 
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
