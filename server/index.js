const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data for whale transactions, tracked addresses and alerts
const whaleTransactions = [
  {
    id: 1,
    address: 'WhaleAddress1',
    token: 'SOL',
    amount: 100000,
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    address: 'WhaleAddress2',
    token: 'USDC',
    amount: 500000,
    timestamp: new Date().toISOString(),
  },
];

const trackedAddresses = [];
const whaleAlerts = [];

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

// Endpoint to retrieve recent whale transactions
app.get('/api/whales', (req, res) => {
  res.json({ transactions: whaleTransactions });
});

// Get currently tracked whale addresses
app.get('/api/whales/tracked', (req, res) => {
  res.json({ tracked: trackedAddresses });
});

// Add a new whale address to track
app.post('/api/whales/tracked', (req, res) => {
  const { address } = req.body;
  if (address && !trackedAddresses.includes(address)) {
    trackedAddresses.push(address);
  }
  res.json({ tracked: trackedAddresses });
});

// Get configured whale alerts
app.get('/api/whales/alerts', (req, res) => {
  res.json({ alerts: whaleAlerts });
});

// Add a new whale alert
app.post('/api/whales/alerts', (req, res) => {
  const { address, token, amount } = req.body;
  whaleAlerts.push({ address, token, amount });
  res.json({ alerts: whaleAlerts });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
