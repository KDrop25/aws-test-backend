// seatRoutes.js
const express = require('express');
const router = express.Router();
const seatController = require('../../controllers/application/seatController');

// Define routes
router.route('/')
    .get(seatController.getSeats)
router.route('/add')
    .post(seatController.addSeats)
router.route('/drop')
    .post(seatController.dropSeatsCollection)
router.route('/status')
    .post(seatController.updatestatus)






module.exports = router;
