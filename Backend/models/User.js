const mongoose = require('mongoose');
const { Schema } = mongoose;
// database schema for the user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
// database model for the user
const User = mongoose.model('User', userSchema);
module.exports = User;
