const express = require('express');
const router = express.Router();
const registerationController = require('../../controllers/application/registrationController')




router.route('/')
    .post(registerationController.handleregistration)


module.exports = router;
