const Razorpay = require('razorpay');

// Validate environment variables before initialization
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay credentials missing in environment variables');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,     // From .env file
  key_secret: process.env.RAZORPAY_KEY_SECRET, // From .env file
  headers: {
    'Content-Type': 'application/json'     // Ensure proper API communication
  }
});

// Add environment mode indication
console.log(`Razorpay initialized in ${process.env.NODE_ENV === 'production' ? 'LIVE' : 'TEST'} mode`);

module.exports = razorpay;