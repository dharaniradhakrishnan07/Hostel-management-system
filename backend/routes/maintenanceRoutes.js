const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

// Route to get all maintenance requests
router.get('/', maintenanceController.getRequests);

// Route to create a maintenance request
router.post('/maintenance', maintenanceController.createRequest);

module.exports = router;
