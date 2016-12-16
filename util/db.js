// var uri = 'mongodb://localhost:27017/farm-markets';
var uri = process.env.MONGOLAB_URI;
var mongoose = require('mongoose')
var debug = require('debug')('app');

// connect to db
const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      resolve(debug('Connected to Database 🎉'));
    })
  });
}
export default connect;
