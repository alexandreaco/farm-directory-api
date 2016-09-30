import Farm from '../models/farm.model';
import { slugify } from '../util/actions.js';
var debug = require('debug')('app');

export const getAllFarms = (req, res) => {
  Farm.find({}, (err, farms) => {
    if (err) {
      res.send(err);
    }
    debug(`found ${farms.length} farms`);
    res.send(farms);
  })
};

export const getFarmsByQuery = (req, res) => {
  // build query object
  const query = {};
  if (req.query.zip) {
    query.Location_Zip = slugify(req.query.zip);
  }
  if (req.query.state) {
    query.Location_State = slugify(req.query.state);
  }

  // get farms
  Farm.find(query, (err, farms) => {
    if (err) {
      res.send(err);
    }
    debug(`found ${farms.length} farms`);
    res.send(farms);
  });
}
