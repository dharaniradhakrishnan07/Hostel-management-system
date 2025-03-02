import React from 'react';

const Payment = ({ amount, receipt }) => {
  const handlePayment = async () => {
    // Create order via backend
    const response = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, receipt }),
    });

    const order = await response.json();

    // Open Razorpay modal
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Hostel Management System',
      description: 'Hostel Fee Payment',
      order_id: order.id,
      handler: async (response) => {
        // Verify payment
        const verificationResponse = await fetch('/api/payment/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }),
        });
        const result = await verificationResponse.json();
        if (result.success) {
          alert('Payment Successful!');
        } else {
          alert('Payment Failed!');
        }
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999',
      },
      theme: { color: '#3399cc' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay ₹{amount}</button>;
};

export default Payment;