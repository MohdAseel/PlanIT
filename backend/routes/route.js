const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controller/user-controller.js");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation.js");
const {
 // getAllEvents,
  getEventById,
  createEvent,
  createClassEvent,
  createPersonalEvent,
} = require("../controller/eventCon.js");

// const { getEventIdsByEmail} = require("../controller/scheduled_events_con");// Import controller


router.post("/signup", signupValidation, signupUser);
router.post("/login", loginValidation, loginUser);
router.post("/personal-events", createPersonalEvent);

// router.get("/", getAllEvents);

router.get("/:clubId", getEventById);

// Handle POST request to add events to the database
router.post("/:clubId", createEvent);


// router.put("/:id", updateEvent);

// router.delete("/:id", deleteEvent);

// router.get("/api/getEventIdsByEmail", getEventIdsByEmail);

module.exports = router;

