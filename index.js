var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var Farm = require('./db').Farm;

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hey, dude!');
});

app.get('/api', function (req, res) {
  Farm.find({}, function (err, farms) {
    res.send(farms);
  })
});

app.get('/api/zip/:zipcode', function (req, res) {
  Farm.find({Location_Zip: req.params.zipcode}, function (err, farms) {
    res.send(farms);
    console.log(`found ${farms.length} farms`);
  });
});

app.get('/api/state/:name', function (req, res) {
  Farm.find({Location_State: req.params.name}, function (err, farms) {
    res.send(farms);
    console.log(`found ${farms.length} farms`);
  });
});

// Body parser
app.use(bodyParser.json());



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
