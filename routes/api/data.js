const express = require('express');
const router = express.Router();
const dataController = require('../../controllers/application/dataController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/:barcode')
    .get(dataController.getPlayer)

module.exports = router;