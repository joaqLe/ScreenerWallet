
const app = require('./app');

const express = require('express');
const cors = require('cors');
// Use the built-in global fetch available in modern Node versions

const app = express();
app.use(cors());
app.use(express.json());

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


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
