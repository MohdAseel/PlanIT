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
} = require("../controller/eventCon.js");

// const { getEventIdsByEmail} = require("../controller/scheduled_events_con");// Import controller

// const { getEventIdsByEmail } = require("../controller/user-controller.js"); // Import controller
// const { getEventDetailsByIds } = require("../controller/scheduled_events_con");

router.post("/signup", signupValidation, signupUser);
router.post("/login", loginValidation, loginUser);
// router.post("/personal-events", createPersonalEvent);
router.post("/acads", createClassEvent);

// router.get("/", getAllEvents);

router.get("/:clubId", getEventByClubId);

// Handle POST request to add events to the database
router.post("/:clubId", createEvent);

// router.put("/:id", updateEvent);

// router.delete("/:id", deleteEvent);

module.exports = router;
