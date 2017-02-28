import connect from './util/db';
import {
  getAllFarms,
  getFarmsByQuery,
} from './controllers/farm.controller';
import {
  getLocationsByState,
} from './controllers/location.controller';
import {
  cleanUpStateNames,
  buildoutFarmObject,
  compileFacilities,
} from './util/actions';
import {
  // readCSV,
  // readFarmsCSV,
} from './util/csvMigration';
import catchErrors from './middleware/catchErrors';
import logger from './middleware/logger';

const express = require('express');
const debug = require('debug')('app');
const middleware = require('swagger-express-middleware');

const app = express();

//---
// Set port
app.set('port', (process.env.PORT || 5000));

//---
// Connect to Database and boot server

connect()
.then(() => {
  middleware('api/swagger/swagger.yaml', app, (err, ware) => {
    // Add all the Swagger Express Middleware, or just the ones you need.
    // NOTE: Some of these accept optional options (omitted here for brevity)
    app.use(

      ware.metadata(),
      ware.CORS(),
      ware.parseRequest(),
      ware.validateRequest(),
      logger,
      catchErrors, // catch any remaining errors
    );

    //---
    // Routes
    //

    // Index route

    app.get('/', (req, res) => {
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
    // app.get('/tools/readMarketsCSV', readCSV);  // don't turn on. you'll add duplicates
    // app.get('/tools/readFarmsCSV', readFarmsCSV);  // don't turn on. you'll add duplicates

    app.listen(5000, () => {
      debug('Farm Directory API listening on port 5000!');
    });
  });
});
