var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
import connect from './util/db';

import {
  getAllFarms,
  getFarmsByZip,
  getFarmsByState,
} from './controllers/farm.controller'

import {
  cleanUpStateNames,
} from './util/actions';

//---
// Routes
//

// Index route

app.get('/', function (req, res) {
  res.send('👋');
});

// Farm routes

app.get('/api', getAllFarms);

app.get('/api/zip/:zipcode', getFarmsByZip);

app.get('/api/state/:state', getFarmsByState);

// Util routes for development help

app.get('/tools/cleanUpStateNames/:name', cleanUpStateNames);

//---
// Apply Middleware

app.use(cors());
app.use(bodyParser.json());

//---
// Connect to Database and boot server

connect()
.then(() => {
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
