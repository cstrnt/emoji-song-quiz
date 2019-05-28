const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = `mongodb://${process.env.MLAB_USERNAME}:${
  process.env.MLAB_PASSWORD
}@ds135786.mlab.com:35786/emoji-song-quiz`;

mongoose.connect(mongoURL, { useNewUrlParser: true });

mongoose.connection.once('open', () =>
  console.log('> Successfully connected to DB')
);

module.exports = mongoose.connection;
