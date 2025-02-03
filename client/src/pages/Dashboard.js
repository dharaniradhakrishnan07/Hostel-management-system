import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Rooms from '../components/RoomList';

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
        <p>Loading rooms...</p> 
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <Rooms/>
    </div>
  );
};

export default Dashboard;
