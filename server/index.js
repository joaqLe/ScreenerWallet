const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
