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
<<<<<<< HEAD
 // createClassEvent,
=======
  createClassEvent,
  createPersonalEvent,
>>>>>>> 6c9dff301c864eb2f8f3f7ee2f2b3ad3b4b7ef5b
  createPersonalEvent,
} = require("../controller/eventCon.js");

// const { getEventIdsByEmail} = require("../controller/scheduled_events_con");// Import controller

const { getEventIdsByEmail} = require("../controller/user-controller.js");// Import controller
const { getEventDetailsByIds} = require("../controller/scheduled_events_con");

router.post("/signup", signupValidation, signupUser);
router.post("/login", loginValidation, loginUser);
router.post("/personal-events", createPersonalEvent);

// router.get("/", getAllEvents);

router.get("/:clubId", getEventById);

// Handle POST request to add events to the database
router.post("/:clubId", createEvent);


// router.put("/:id", updateEvent);

// router.delete("/:id", deleteEvent);

module.exports = router;

