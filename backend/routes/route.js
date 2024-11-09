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
} = require("../controller/eventCon.js");

router.post("/signup", signupValidation, signupUser);
router.post("/login", loginValidation, loginUser);
router.post("/personalevents", createPersonalEvent);
router.post("/acads", createClassEvent);

router.get("/api/getEventIds", getEventIdsByEmail);
router.post("/api/getEventDetails", getEventDetailsByIds);
// router.get("/", getAllEvents);

router.get("/:clubId", getEventByClubId);

// Handle POST request to add events to the database
router.post("/:clubId", createEvent);

// router.put("/:id", updateEvent);

// router.delete("/:id", deleteEvent);

module.exports = router;
