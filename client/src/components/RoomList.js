import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch room data when the component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("https://hostel-management-system-3-b7dh.onrender.com/api/rooms/getRooms"); // Adjust API URL
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError("Error fetching room data");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);
  // Display loading, error, or room list
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms?.map((room) => (
        <div key={room._id} className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">{room.room_name}</h2>
          <p className="text-gray-500">{room.type}</p>
          <p className="mt-2 text-gray-700">Size: {room.size} m²</p>
          <p className="text-gray-700">Capacity: {room.capacity} people</p>
          <p className="text-gray-700">Price: ${room.price}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Amenities:</h3>
            <ul className="list-disc pl-5">
              {room?.amenities?.map((amenity, index) => (
                <li key={index} className="text-gray-600">{amenity}</li>
              ))}
            </ul>
          </div>
          <button>
<Link to ="/booking" >
Book Now
</Link>
</button>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
