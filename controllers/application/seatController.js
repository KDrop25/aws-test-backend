// seatController.js
const Seat = require('../../models/Seat'); // Assuming you have a Seat model






const updatestatus = async(req,res)=>{
  const response = req.body;
  
  for (const seatId of response.selectedSeats) {
    const foundSeat = await Seat.findById(seatId).exec();
    foundSeat.status = 'Booked';
    const result = await foundSeat.save();
    console.log(result)

  }
  res.sendStatus(201);
};






const getSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    console.error('Error fetching seat data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addSeats = async (req,res) => {
    const numRows = 24;
    const seatsPerRow = 28;
    const seatAvailability = [];
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    

    for (let row = 1; row <= numRows; row++) {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const seatRow = alphabets.charAt(row - 1);
        const seatName = seatRow + seatNum.toString();
        const seatNumber = seatNum.toString();

        const newSeat = {
          seatName,
          seatNumber,
          seatRow,
        };

          seatAvailability.push(newSeat);
        }
      }
    
    
    console.log(seatAvailability)
    const insertedSeats = await Seat.insertMany(seatAvailability);
    console.log("gg3")
    res.json(seatAvailability);
};


const dropSeatsCollection = async (req, res) => {
  try {
    await Seat.collection.drop();
    res.json({ success: true, message: 'Collection dropped successfully' });
  } catch (error) {
    console.error('Error dropping collection:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = { getSeats, addSeats, dropSeatsCollection,updatestatus };