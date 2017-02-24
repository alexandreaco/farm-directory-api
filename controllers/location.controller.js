/* eslint-disable import/prefer-default-export */
import Location from '../models/location.model';
import { slugify } from '../util/helpers';

export const getLocationsByState = (req, res) => {
  const query = {};
  if (req.query.state) {
    query.stateID = slugify(req.query.state);
  }

  Location.find(query)
  .populate('products')
  .populate('facilities')
  .populate('activities')
  .exec((err, data) => {
    if (err) res.send(err);
    res.send({
      count: data.length,
      // swagger: req.swagger,
      rows: data,
    });
  });
};
