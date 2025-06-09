# ScreenerWallet

A minimal prototype implementing Phase 1 of the ScreenerWallet roadmap.

## Getting Started

### Server

```
cd server
npm install
npm start
```

This starts an Express server on port 3001 and exposes `/api/prices?token=<address>`.
Additional endpoints for whale tracking include:

* `GET /api/whales` - recent whale transactions
* `GET /api/whales/tracked` and `POST /api/whales/tracked` - manage tracked addresses
* `GET /api/whales/alerts` and `POST /api/whales/alerts` - configure whale alerts

### Client

```
cd client
npm install
npm run dev
```

Open `http://localhost:5173` to view the React app.
The UI now includes a **Whales** page where you can view recent whale transactions,
track specific addresses and configure whale alerts.
