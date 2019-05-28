const express = require('express');
const Song = require('../models/Song');

const router = express.Router();

router.get('/api/songs', (req, res, next) => {
  Song.find().exec((err, songs) => {
    if (err) return next(err);
    res.send(songs);
  });
});

router.get('/api/songs/:songId', (req, res, next) => {
  const { songId } = req.params;
  Song.findOne({ _id: songId }).exec((err, songs) => {
    if (err) return next(err);
    res.send(songs);
  });
});

router.post('/api/songs/add', (req, res, next) => {
  const newSong = new Song(req.body);

  // Look if there is already a song with the same correct answer
  const { meta } = newSong.answers.find(a => a.correct === true);
  Song.find({ 'answers.meta': meta, 'answers.correct': true }, (err, song) => {
    if (song) return next('This song already exists in our DB!');
  });

  // Return song
  newSong.save(err => {
    if (err) return next(err);
    res.send(newSong);
  });
});

module.exports = router;
