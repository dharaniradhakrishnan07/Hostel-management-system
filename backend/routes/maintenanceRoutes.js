const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

router.get('/', maintenanceController.getRequests);
router.post('/', maintenanceController.createRequest);

module.exports = router;
