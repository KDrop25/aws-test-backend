// models/offlineRegistration.js

const mongoose = require('mongoose');

const OfflineRegistrationSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  barcodeNumber: {
    type: String,
    required: true
  },
  foodCouponStatus: {
    type: String,
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  teamSeatNumberRange: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('OfflineRegistration', OfflineRegistrationSchema);
