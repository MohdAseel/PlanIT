// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /@smail\.iitm\.ac\.in$/ 
  },
  password: { 
    type: String, 
    required: true 
  }
});

// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Model export
module.exports = mongoose.model('User', userSchema);
