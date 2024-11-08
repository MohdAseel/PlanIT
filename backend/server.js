const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const ClubModal = require("./models/club.js");
const Router = require("./routes/route.js");
require("dotenv").config();
require("./database/db");
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", Router);

//this was created to add clubs to spheres
// app.get("/bullshit", async (req, res) => {
//   try {
//     const sampleClub = new ClubModal({
//       clubId: "TAIC",
//       clubname: "AI Club",
//       category: "shashtra",
//       description: "This is a sample club for demonstration purposes.",
//       eventId: ["TAIC0001", "TAIC0002"],
//     });
//     console.log(sampleClub);

//     await sampleClub.save();
//     res.send("Club saved successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error saving club");
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
