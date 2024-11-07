const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // role: { type: String, enum: ['admin', 'student'], required: true },
    password: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now }
  });
  
  const UserModal = mongoose.model('users', UserSchema);
  module.exports = UserModal;
  