import React from 'react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();

  const rooms = [
    {
      id: 1,
      room_name: 'Ocean View Suite',
      price: 250,
    },
    {
      id: 2,
      room_name: 'Deluxe Mountain View',
      price: 200,
    },
    {
      id: 3,
      room_name: 'Standard Room',
      price: 100,
    },
  ];

  const handleBookNow = (roomId) => {
    navigate(`/payment/${roomId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white shadow-lg rounded-lg p-4 border"
          >
            <h3 className="text-xl font-semibold">{room.room_name}</h3>
            <p className="text-gray-700">Price: ${room.price} per night</p>
            <button
              onClick={() => handleBookNow(room.id)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
