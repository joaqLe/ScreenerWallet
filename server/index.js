const http = require('http');
const WebSocket = require('ws');
const app = require('./app');

const PORT = process.env.PORT || 3001;

let server;

if (require.main === module) {
  server = http.createServer(app);
  const wss = new WebSocket.Server({ server });
  app.locals.wss = wss;
  server.listen(PORT, () => console.log(`Server running on ${PORT}`));
} else {
  server = http.createServer(app);
}

module.exports = server;
