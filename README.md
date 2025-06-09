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

### Sniping Configuration

The new **Sniping** page allows you to create automatic purchase rules. It can
be accessed from the main navigation once the client is running. Rules are
stored in memory on the server and can be managed via the following endpoints:

```
GET  /api/sniping/rules   - list configured rules
POST /api/sniping/rules   - create a new rule
GET  /api/sniping/snipes  - list latest snipes
```
