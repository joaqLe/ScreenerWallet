const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage for sniping rules and executed snipes
const snipingRules = [];
const snipes = [];

// Simple health endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Placeholder endpoint for token prices using DexScreener API
app.get('/api/prices', async (req, res) => {
  try {
    const { token } = req.query;
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${token}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch price data' });
  }
});

// Retrieve existing sniping rules
app.get('/api/sniping/rules', (req, res) => {
  res.json(snipingRules);
});

// Create a new sniping rule
app.post('/api/sniping/rules', (req, res) => {
  const rule = { id: Date.now(), ...req.body };
  snipingRules.push(rule);
  res.json(rule);
});

// Retrieve the last executed snipes
app.get('/api/sniping/snipes', (req, res) => {
  res.json(snipes);
});

// Record a new snipe (for demo purposes)
app.post('/api/sniping/snipes', (req, res) => {
  const snipe = { id: Date.now(), timestamp: Date.now(), ...req.body };
  snipes.unshift(snipe);
  // Keep only the latest 10 snipes
  if (snipes.length > 10) snipes.pop();
  res.json(snipe);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
