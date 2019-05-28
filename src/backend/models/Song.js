const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  originalText: String,
  emojiText: String,
  answers: [{ meta: String, correct: Boolean }],
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
