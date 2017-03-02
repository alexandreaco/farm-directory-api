import connect from './util/db';
import registerModels from './models';
import {
  getLocationsByQuery,
} from './controllers/location.controller';
import catchErrors from './middleware/catchErrors';
import logger from './middleware/logger';

const express = require('express');
const debug = require('debug')('app');
const middleware = require('swagger-express-middleware');

const app = express();

// Set port
app.set('port', (process.env.PORT || 5000));

// Connect to Database and boot server
registerModels();
connect()
.then(() => {
  middleware('api/swagger/swagger.yaml', app, (err, ware) => {
    app.use(
      ware.metadata(),
      ware.CORS(),
      ware.parseRequest(),
      ware.validateRequest(),
      logger,
      // catchErrors, // catch any remaining errors
    );

    // Routes
    app.get('/', (req, res) => {
      res.send('👋');
    });
    app.get('/api/locations', getLocationsByQuery);

    // Util routes for development help
    // app.get('/tools/cleanUpStateNames/:name', cleanUpStateNames);
    // app.get('/api/util/build-out-farms', buildoutFarmObject);
    // app.get('/tools/compileFacilities', compileFacilities);
    // app.get('/tools/readMarketsCSV', readCSV);  // don't turn on. you'll add duplicates
    // app.get('/tools/readFarmsCSV', readFarmsCSV);  // don't turn on. you'll add duplicates

    app.use(catchErrors);

    app.listen(5000, () => {
      debug('Farm Directory API listening on port 5000!');
    });
  });
});
