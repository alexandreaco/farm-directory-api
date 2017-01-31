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
  buildoutFarmObject,
} from './util/actions';

//---
// Set port
app.set('port', (process.env.PORT || 5000));

//---
// Apply Middleware

app.use(cors());
app.use(bodyParser.json());

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
app.get('/api/util/build-out-farms', buildoutFarmObject);

//---
// Connect to Database and boot server

connect()
.then(() => {
  app.listen(app.get('port'), function() {
    debug('Farm Directory API listening on port 5000!');
  });
});
