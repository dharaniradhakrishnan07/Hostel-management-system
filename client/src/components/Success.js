import React from 'react';

import { useParams } from 'react-router-dom';
const success = () => {
  const { roomId } = useParams(); // Get room ID from the URL

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">
        Payment Successful!
      </h2>
      <p>Thank you for your booking. Your room ID is {roomId}.</p>
      <p className="mt-4 text-lg">We look forward to hosting you!</p>
    </div>
  );
};

export default success;
