const express = require("express");
const { signupUser, loginUser } = require("../controller/user-controller.js");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation.js");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  createClassEvent,
  createPersonalEvent,
} = require("../controller/eventCon.js");


router.post("/signup", signupValidation, signupUser);
router.post("/login", loginValidation, loginUser);

router.get("/", getAllEvents);
router.post("/acads", createClassEvent);

router.get("/:id", getEventById);

// Handle POST request to add events to the database
router.post("/:clubId", createEvent);
router.post("/personal-events", createPersonalEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;

