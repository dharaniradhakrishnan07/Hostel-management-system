import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Payment = () => {
  const { roomId } = useParams(); // Get room ID from the URL
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    // Simulate successful payment
    setPaymentSuccess(true);
    // Navigate to success page after payment is successful
    navigate(`/success/${roomId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment</h2>
      <p>Room ID: {roomId}</p>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="card-number">
          Card Number
        </label>
        <input
          type="text"
          id="card-number"
          className="border p-2 w-full mb-4"
          placeholder="Enter card number"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="expiration-date">
          Expiration Date
        </label>
        <input
          type="text"
          id="expiration-date"
          className="border p-2 w-full mb-4"
          placeholder="MM/YY"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="cvv">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          className="border p-2 w-full mb-4"
          placeholder="CVV"
        />
      </div>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white py-2 px-4 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
