// src/pages/Billing.js

import React, { useState } from 'react';
import api from '../services/api';

const Billing = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/create-payment-intent', {
        amount,
        currency: 'usd',
      });

      const clientSecret = response.data.clientSecret;
      console.log('Payment successful!', clientSecret);
    } catch (err) {
      setError('Payment failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Billing</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-4"
      />
      
      <button
        onClick={handlePayment}
        className={`bg-green-500 text-white p-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default Billing;
