const express = require('express');
const cors = require('cors');
// Use the built-in global fetch available in modern Node versions

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data for whale transactions, tracked addresses, sniping rules and
// alerts. These are purely for demo purposes and should be replaced with a
// persistent store in a real application.
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
const snipingRules = [];
const snipes = [];
const alerts = [];

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Placeholder endpoint for token prices using DexScreener API
app.get('/api/prices', async (req, res) => {
  try {
    const { token } = req.query;
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${token}`,
    );
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

// Placeholder endpoint for contract security information
app.get('/api/security', (req, res) => {
  const { token } = req.query;
  // In a real implementation this would query an on-chain indexer or security API
  // For now return mocked data so the UI can display something useful
  res.json({
    token,
    score: 72,
    topHolders: [
      { address: 'Holder1', share: 35 },
      { address: 'Holder2', share: 20 },
      { address: 'Holder3', share: 15 },
    ],
    properties: {
      mintable: true,
      mutable: false,
      authority: 'ExampleAuthority',
    },
    critical: false,
  });
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

// Get all alerts
app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

// Create a new alert
app.post('/api/alerts', (req, res) => {
  const { token, type, condition, notify } = req.body;
  const alert = {
    id: Date.now().toString(),
    token,
    type,
    condition,
    notify,
    active: true,
  };
  alerts.push(alert);
  res.json(alert);
});

// Update an alert by id (e.g., toggle active state)
app.patch('/api/alerts/:id', (req, res) => {
  const { id } = req.params;
  const alert = alerts.find((a) => a.id === id);
  if (!alert) {
    return res.status(404).json({ error: 'Alert not found' });
  }
  Object.assign(alert, req.body);
  res.json(alert);
});

module.exports = app;
