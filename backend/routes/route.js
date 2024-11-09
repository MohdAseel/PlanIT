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
  getEventIdsByEmail,
  getEventDetailsByIds,
  addEvent,
  starClub,
  getStarredClubs,
  getLatestEvents,
  getEventById,
  getAcademicEvents,
} = require("../controller/eventCon.js");

// User routes
router.post("/signup", signupValidation, signupUser);
router.post("/login", loginValidation, loginUser);

// Event routes
router.post("/personalevents", createPersonalEvent);
router.post("/acads", createClassEvent);
router.get("/acads", getAcademicEvents);
router.get("/api/getEventIds", getEventIdsByEmail);
router.post("/api/getEventDetails", getEventDetailsByIds);

// router.get("/", getAllEvents);

// Handle POST request to add events to the databas
router.post("/user/addEvent", addEvent); // Add route for adding an event to a user

// **Reordered Event Retrieval Routes**
// Ensure specific routes are defined before generic ones to prevent conflicts

// Starred Clubs Retrieval (More Specific)
router.get("/starred-clubs/:email", getStarredClubs);

// Latest Events Retrieval
router.get("/latest-events", getLatestEvents);

// Single Event Retrieval
router.get("/event/:eventId", getEventById);

router.post("/star-club", routevalidation, starClub);
// Generic Club Events Retrieval

// Handle POST request to add events to the database
router.get("/:clubId", getEventByClubId);
router.post("/:clubId", createEvent);

module.exports = router;
