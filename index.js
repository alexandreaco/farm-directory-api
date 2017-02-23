var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var debug = require('debug')('app');
var middleware = require('swagger-express-middleware');
import connect from './util/db';

import {
  getAllFarms,
  getFarmsByQuery,
  getFarmsByZip,
  getFarmsByState,
} from './controllers/farm.controller';

import {
  getLocationsByState,
} from './controllers/location.controller';

import {
  cleanUpStateNames,
  buildoutFarmObject,
  compileFacilities,
  readCSV,
  getLocations,
  readFarmsCSV,
} from './util/actions';

//---
// Set port
app.set('port', (process.env.PORT || 5000));

//---
// Connect to Database and boot server

connect()
.then(() => {
  middleware('api/swagger/swagger.yaml', app, function(err, middleware) {
    // Add all the Swagger Express Middleware, or just the ones you need.
    // NOTE: Some of these accept optional options (omitted here for brevity)
    app.use(
      middleware.metadata(),
      middleware.CORS(),
      // middleware.files(),
      middleware.parseRequest(),
      middleware.validateRequest(),
      // middleware.mock()
    );

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
    app.get('/tools/compileFacilities', compileFacilities);
    app.get('/api/locations', getLocationsByState);
    // app.get('/tools/readCSV', readCSV);  // don't turn on. you'll add duplicates
    // app.get('/tools/readFarmsCSV', readFarmsCSV);  // don't turn on. you'll add duplicates

    app.listen(5000, function() {
      debug('Farm Directory API listening on port 5000!');
    });
  });
})
