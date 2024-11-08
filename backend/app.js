// app.js or index.js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user"); // Import the User model
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Define the endpoint for adding events
app.post("/api/user/addEvent", async (req, res) => {
  const { email, eventId } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the event is already in scheduled_events
    if (user.scheduled_events.includes(eventId)) {
      return res.status(400).json({ message: "Event already added" });
    }

    // Add the event to the user's scheduled_events
    user.scheduled_events.push(eventId);
    await user.save();

    res.status(200).json({ message: "Event added successfully" });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = app;


/*const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Event = require("./models/events");
const User = require("./models/user");
const UserEvent = require("./models/userEvents");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/planit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Route to fetch events by clubId
app.get("/:clubId", async (req, res) => {
  try {
    const events = await Event.find({ clubId: req.params.clubId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
*/