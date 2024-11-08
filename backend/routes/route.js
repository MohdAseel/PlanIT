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
} = require("../controller/eventCon.js");
// User routes
router.post("/signup", signupValidation, signupUser);
router.post("/login", loginValidation, loginUser);

// Event routes
router.post("/personalevents", createPersonalEvent);
router.post("/acads", createClassEvent);
router.post("/user/addEvent", addEvent); // Add route for adding an event to a user

// Event retrieval routes
router.get("/:clubId", getEventByClubId);

// Handle POST request to add events to the database
router.post("/:clubId", createEvent);

module.exports = router;
