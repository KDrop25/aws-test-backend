// models/application.js

const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
