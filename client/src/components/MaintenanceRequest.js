// src/pages/MaintenanceRequest.js

import React, { useState } from 'react';
import api from '../services/api';

const MaintenanceRequest = () => {
  const [description, setDescription] = useState('');
  const [roomId, setRoomId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await api.post('/maintenance-request', { description, roomId });
      alert('Maintenance request submitted successfully!');
    } catch (err) {
      setError('Failed to submit maintenance request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Create Maintenance Request</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <textarea
        placeholder="Describe the issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2 mb-4"
      />
      <button
        onClick={handleSubmit}
        className={`bg-blue-500 text-white p-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </div>
  );
};

export default MaintenanceRequest;
