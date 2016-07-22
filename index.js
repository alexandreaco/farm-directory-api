var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var data = require('./data');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api', function (req, res) {
  res.send(data);
});

app.get('/api/zip/:zipcode', function (req, res) {
  var response = [];
  data.forEach(function(item, index) {
     if(item.Location_Zip == req.params.zipcode) {
       response.push(item);
     }
  })

  res.send(response);
  console.log('found ' + response.length + ' items');
});

app.get('/api/state/:name', function (req, res) {
  var response = [];
  data.forEach(function(item, index) {
     if(item.Location_State.toLowerCase() == req.params.name.toLowerCase()) {
       response.push(item);
     }
  })

  res.send(response);
  console.log('found ' + response.length + ' items');
});

// Body parser
app.use(bodyParser.json());



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
