var uri = 'mongodb://localhost:27017/farm-markets';
var mongoose = require('mongoose')

// connect to db
const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      resolve(console.log('Connected to Database 🎉'));
    })
  });
}
export default connect;
