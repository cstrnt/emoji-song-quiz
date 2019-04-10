const express = require('express');
const bodyParser = require('body-parser');
const shortId = require('shortid');
const cors = require('cors');
const next = require('next');
const db = require('./db');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  // Use middleware
  server.use(bodyParser.json());
  server.use(cors());

  server.get('/api/songs', (req, res) => {
    const songs = db.get('songs').value();
    res.send({ data: songs });
  });

  server.get('/api/songs/:songId', (req, res) => {
    const { songId } = req.params;
    const songById = db
      .get('songs')
      .find({ id: songId })
      .value();
    res.send({ data: songById });
  });

  server.post('/api/songs/add', (req, res) => {
    const song = { id: shortId.generate(), ...req.body };
    const correctAnswer = song.answers.find(a => a.correct);
    // Look if there is already a song with the same correct answer
    const answersFromDB = db
      .get('songs')
      .map('answers')
      .value()
      // Flatten the arrays
      .reduce((a, b) => a.concat(b), []);

    // If there is a song, return an error
    if (answersFromDB.some(a => a.songName === correctAnswer.songName))
      res
        .statusCode(500)
        .send({ message: 'This translation already exists !', data: null });
    // Return song
    db.get('songs')
      .push(song)
      .write();
    res.send({ data: song });
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
