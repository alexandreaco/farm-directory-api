import Location from '../models/location.model';
import { slugify } from '../util/actions.js';
var debug = require('debug')('app');

export const getLocationsByState = (req, res) => {
  const query = {};
  if (req.query.state) {
    query.stateID = slugify(req.query.state);
  }

  Location.find(query)
  .populate('products')
  .populate('facilities')
  .populate('activities')
  .exec(function (err, data) {
    if (err) reject(err);
    res.send({
      count: data.length,
      // swagger: req.swagger,
      rows: data,
    });
  });
}
