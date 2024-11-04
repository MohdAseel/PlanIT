const express = require('express');
const mongoose = require('mongoose');
const Event = require('./models/events');
const User = require('./models/user');
const UserEvent = require('./models/userevents');

const app = express();
app.use(express.json());

