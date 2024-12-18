const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const EventModal = require("./models/eventSchema.js");
const Router = require("./routes/route.js");
require("dotenv").config();
require("./database/db");
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/", Router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
