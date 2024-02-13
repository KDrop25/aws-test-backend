const express = require('express');
const router = express.Router();
const registerController = require('../controllers/authentication/registerController');

router.post('/', registerController.handleNewUser);
router.get('/verify', registerController.VerifyEmail);

module.exports = router;



