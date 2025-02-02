import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Import the axios instance

const Dashboard = () => {
  // State to store rooms data, loading state, and errors
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rooms from the backend when the component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get('/rooms');  // Make the GET request to fetch rooms
        setRooms(response.data);  // Store the fetched rooms in state
        setLoading(false);  // Set loading to false after data is fetched
      } catch (err) {
        setError('Failed to fetch rooms');  // Set an error message if the request fails
        setLoading(false);  // Set loading to false even in case of error
      }
    };

    fetchRooms();  // Call the function to fetch the rooms
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  // Render loading state, error message, or the rooms data
  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p>Loading rooms...</p>  {/* Show loading message */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-red-500">{error}</p>  {/* Show error message */}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.roomNumber} className="border p-4 rounded-md shadow-md">
              <h3 className="font-semibold">Room Number: {room.roomNumber}</h3>
              <p>Status: {room.isAvailable ? 'Available' : 'Allocated'}</p>
            </div>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
