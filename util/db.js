require('dotenv').config();

const uri = process.env.MONGOLAB_URI;
const mongoose = require('mongoose');
const debug = require('debug')('app');

// connect to db
const connect = () => (
  new Promise((resolve) => {
    mongoose.connect(uri);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      resolve(debug('Connected to Database 🎉'));
    });
  })
);
export default connect;
