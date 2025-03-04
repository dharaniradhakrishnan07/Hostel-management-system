import React, { useState } from 'react';
import api from '../services/api';

const MaintenanceRequest = () => {
  const [formData, setFormData] = useState({
    description: '',  // Issue description
    roomId: '',       // Room ID
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/maintenance-request', formData);
      alert('Maintenance request submitted successfully!');
      console.log('Success:', response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Create Maintenance Request</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <textarea
        name="description"
        placeholder="Describe the issue"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
      />
      <input
        name="roomId"
        type="text"
        placeholder="Room ID"
        value={formData.roomId}
        onChange={handleChange}
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
