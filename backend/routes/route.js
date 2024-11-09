const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controller/user-controller.js");
const {
  signupValidation,
  loginValidation,
  routevalidation,
} = require("../Middlewares/AuthValidation.js");
const {
  createEvent,
  createClassEvent,
  getEventByClubId,
  createPersonalEvent,
  addEvent,
  starClub,
  getStarredClubs,
  getLatestEvents,
  getEventById,
} = require("../controller/eventCon.js");

// User routes
router.post("/signup", signupValidation, signupUser);
router.post("/login", loginValidation, loginUser);

// Event routes
router.post("/personalevents", createPersonalEvent);
router.post("/acads", createClassEvent);
router.post("/user/addEvent", addEvent); // Add route for adding an event to a user

// **Reordered Event Retrieval Routes**
// Ensure specific routes are defined before generic ones to prevent conflicts

// Starred Clubs Retrieval (More Specific)
router.get("/starred-clubs/:email", getStarredClubs);

// Latest Events Retrieval
router.get("/latest-events", getLatestEvents);

// Single Event Retrieval
router.get("/event/:eventId", getEventById);

// Generic Club Events Retrieval
router.get("/:clubId", getEventByClubId);

// Handle POST request to add events to the database
router.post("/star-club", routevalidation, starClub);
router.post("/:clubId", createEvent);

module.exports = router;
