const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const next = require('next');
const db = require('./src/backend/db');
const songs = require('./src/backend/routes/song');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Use middleware
  server.use(bodyParser.json());
  server.use(cors());
  server.use('/', songs);
  // Handle Errors
  server.use((err, req, res, next) => {
    res.status(500).send({ error: err });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
