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


## License

This project is licensed under the [MIT License](LICENSE).

### Environment Variables

Create a `.env` file inside the `client` directory and set the Solana RPC URL
used by the wallet:

```
VITE_RPC_URL=https://your.solana.rpc/url
```

Vite exposes variables prefixed with `VITE_` to the client application. This
value is required for network requests performed by the wallet screen.

