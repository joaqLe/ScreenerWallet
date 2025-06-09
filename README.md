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

### Client

```
cd client
npm install
npm run dev
```

Open `http://localhost:5173` to view the React app.

### Copy Trading

Navigate to `/copy-trading` in the app to explore popular traders and configure
your copy settings. Follow or unfollow traders and set the percentage of your
balance to copy for each one.
