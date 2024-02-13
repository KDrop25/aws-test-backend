// models/player.js

const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  inGameId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pfp:{
    type:String,
    
  },
  IdCard:{
    type:String,
  },
  barcode:{
    type:String
  }
});

module.exports = mongoose.model('Player', PlayerSchema);
