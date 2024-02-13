// models/team.js

const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teamleader:{
    type:String,    
  },
  event: {
    type: String,
    required: true
  },
  college:{
    type:String,
    required:true
  },
  players: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    },
    name: String,
    contactNumber: String,
    inGameId: String,
    email: String
  }],
});

module.exports = mongoose.model('Team', TeamSchema);
