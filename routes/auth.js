const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication/authController');

router.post('/', authController.handleLogin);
router.post('/changepwd', authController.changepwd);
router.get('/otp/:email', authController.sendotp);
router.get('/otp/verify/:otp', authController.verifyotp);


module.exports = router;



