const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('your-stripe-secret-key');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const users = [];

app.post('/api/register', (req, res) => {
  const { username, email, password, role } = req.body;
  
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    role
  };

  users.push(newUser);
  res.status(201).json({ message: 'Registration successful', userId: newUser.id });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    token: 'mock-jwt-token-' + user.id
  });
});

// Stripe payment route
app.post('/api/payment', async (req, res) => {
  const { amount, currency, source } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: source,
      confirm: true
    });

    res.status(200).json({ message: 'Payment successful', paymentIntent });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
});

// Stripe checkout session route
app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ message: 'Checkout session creation failed', error: error.message });
  }
});

// Artworks endpoint with pagination
app.get('/api/artworks', async (req, res) => {
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 100;
  const skip = (page - 1) * limit;

  try {
    const response = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
    const artworks = response.data.products.map(product => ({
      id: product.id,
      title: product.title,
      author: product.brand,
      price: product.price,
      location: product.category,
      image: product.thumbnail,
      description: product.description
    }));

    res.setHeader('x-total-count', response.data.total);
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch artworks', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
