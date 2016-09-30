var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var debug = require('debug')('app');
import connect from './util/db';

import {
  getAllFarms,
  getFarmsByQuery,
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
app.get('/api/farms/', getFarmsByQuery);

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
    debug('Farm Directory API listening on port 3000!');
  });
});
