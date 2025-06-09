
const app = require('./app');

const express = require('express');
const cors = require('cors');
// Use the built-in global fetch available in modern Node versions

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for alerts
const alerts = [];

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
