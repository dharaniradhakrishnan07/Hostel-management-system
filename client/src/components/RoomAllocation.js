// src/pages/RoomAllocation.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const RoomAllocation = () => {
  const [rooms, setRooms] = useState([]);
  const [residentId, setResidentId] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get('/rooms');
        setRooms(response.data);
      } catch (err) {
        setError('Failed to fetch rooms.');
      }
    };

    fetchRooms();
  }, []);

  const handleAllocate = async () => {
    setLoading(true);
    setError(null);

    try {
      await api.post('/allocate-room', { roomNumber: selectedRoom, residentId });
      alert('Room allocated successfully!');
    } catch (err) {
      setError('Failed to allocate room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Allocate Room</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <select
        value={selectedRoom}
        onChange={(e) => setSelectedRoom(e.target.value)}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Select Room</option>
        {rooms.map((room) => (
          <option key={room.roomNumber} value={room.roomNumber}>
            {room.roomNumber}
          </option>
        ))}
      </select>
      
      <input
        type="text"
        placeholder="Resident ID"
        value={residentId}
        onChange={(e) => setResidentId(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      
      <button
        onClick={handleAllocate}
        className={`bg-blue-500 text-white p-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Allocating...' : 'Allocate Room'}
      </button>
    </div>
  );
};

export default RoomAllocation;
