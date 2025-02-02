const MaintenanceRequest = require('../models/MaintenanceRequest');

// Get all maintenance requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find().populate('roomId');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Server error, unable to fetch maintenance requests.' });
  }
};

// Create a new maintenance request
exports.createRequest = async (req, res) => {
  const { description, roomId } = req.body;

  try {
    const newRequest = new MaintenanceRequest({
      description,
      roomId,
      status: 'pending', // New request has a 'pending' status by default
    });

    await newRequest.save();
    res.json({ message: 'Maintenance request created successfully!', request: newRequest });
  } catch (err) {
    res.status(500).json({ error: 'Server error, unable to create maintenance request.' });
  }
};

// Update the status of a maintenance request (e.g., completed)
exports.updateRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;

  try {
    const request = await MaintenanceRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    request.status = status;
    await request.save();
    res.json({ message: 'Maintenance request status updated!', request });
  } catch (err) {
    res.status(500).json({ error: 'Server error, unable to update request status.' });
  }
};
