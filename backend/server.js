const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const EventModal = require("./models/eventSchema.js");
const Router = require("./routes/route.js");
require("dotenv").config();
require("./database/db");
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", Router);

// Handle POST request to add events to the database
app.post("/:clubId", async (req, res) => {
  try {
    const { clubId, eventId, title, startdate, enddate, location, description, image } = req.body;

    const event = new EventModal({
      clubId,
      eventId,
      title,
      startdate,
      enddate,
      location,
      description,
      image,
    });

    await event.save();
    res.status(200).send("Event saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving event");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

