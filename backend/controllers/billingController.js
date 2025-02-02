const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Generate a payment link for a resident
exports.createPaymentIntent = async (req, res) => {
  const { amount, currency, description } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: 'Error creating payment intent.' });
  }
};

// Handle successful payment (this can be extended to save payment details in DB)
exports.paymentSuccess = async (req, res) => {
  const { paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      res.json({ message: 'Payment successful!', paymentIntent });
    } else {
      res.status(400).json({ error: 'Payment failed!' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error processing payment.' });
  }
};
