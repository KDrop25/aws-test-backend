const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  seatName: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
  seatRow:{
    type:String,
    required:true,
  },
  status: {
    type: String,
    enum: ['Available', 'Booked'],
    default: 'Available',
  },
});

module.exports = mongoose.model('Seat', seatSchema);