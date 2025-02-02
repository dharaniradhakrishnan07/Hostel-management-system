const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Route to create a billing invoice for a resident
router.post('/create-invoice', async (req, res) => {
  const { amount, residentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      description: `Billing for resident ${residentId}`,
    });

    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
