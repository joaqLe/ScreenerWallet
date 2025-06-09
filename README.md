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

The navigation bar now includes a **Perfil** link where you can customize your alias, avatar,
visualize performance statistics and badges, and ajustar configuración de idioma,
moneda preferida y seguridad 2FA.
