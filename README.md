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

- `GET /api/whales` - recent whale transactions
- `GET /api/whales/tracked` and `POST /api/whales/tracked` - manage tracked addresses
- `GET /api/whales/alerts` and `POST /api/whales/alerts` - configure whale alerts

It also exposes a `/api/security?token=<address>` endpoint returning mock contract
security data used by the client.

### Client

```
cd client
npm install
npm run dev
```

Open `http://localhost:5173` to view the React app.

### Additional Pages

- **Educación**: mini-tutoriales para evitar scams y aprender funciones avanzadas.
- **FAQ**: preguntas frecuentes con un buscador sencillo.

### Settings

The client now includes a simple settings page where you can:

- Toggle dark or light mode.
- Enable or disable biometric/PIN security (placeholder).
- Control global notifications.
  The navigation bar now includes a **Perfil** link where you can customize your alias, avatar,
  visualize performance statistics and badges, and ajustar configuración de idioma,
  moneda preferida y seguridad 2FA.
  The UI now includes a **Whales** page where you can view recent whale transactions,
  track specific addresses and configure whale alerts.

The navigation includes a **Security** page that visualizes contract security
information using the `/api/security` endpoint.

### Smart Orders

Navigate to `/orders` in the client to experiment with limit and stop orders.

### Copy Trading

Navigate to `/copy-trading` in the app to explore popular traders and configure
your copy settings. Follow or unfollow traders and set the percentage of your
balance to copy for each one.

### Sniping Configuration

The new **Sniping** page allows you to create automatic purchase rules. It can
be accessed from the main navigation once the client is running. Rules are
stored in memory on the server and can be managed via the following endpoints:

```
GET  /api/sniping/rules   - list configured rules
POST /api/sniping/rules   - create a new rule
GET  /api/sniping/snipes  - list latest snipes
```

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

## Contributing

Install dependencies in the root, server and client folders before working on the project:

```
npm install
npm --prefix server install
npm --prefix client install --legacy-peer-deps
```

Husky is configured with lint-staged so `npm test` and `prettier --check` run automatically on staged files before each commit.
