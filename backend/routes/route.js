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
} = require("../controller/eventCon.js");

const router = express.Router();

router.post("/signup", signupValidation, signupUser);
router.post("/login", loginValidation, loginUser);

router.get("/", getAllEvents);

router.get("/:id", getEventById);

router.post("/:clubId", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
