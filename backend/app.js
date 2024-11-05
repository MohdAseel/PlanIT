const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Event = require('./models/events');
<<<<<<< HEAD
=======
const User = require('./models/User');
const UserEvent = require('./models/userevents');
>>>>>>> 2099bd6182e1c20ea97457594150d05060a0e8f1

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/planit', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to MongoDB");
});

// Route to fetch events by clubId
app.get('/:clubId', async (req, res) => {
    try {
        const events = await Event.find({ clubId: req.params.clubId });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

