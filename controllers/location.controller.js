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
      rows: data,
    });
  });
};

export const getLocationsByQuery = (req, res, next) => { // eslint-disable-line consistent-return
  if (!req.query.lat || !req.query.lon) {
    return next(new Error('Incomplete lat lon parameters'));
  }
  const limit = req.query.limit || 100;
  let maxDistance = req.query.distance || 8;
  maxDistance /= (3959 * Math.PI) / 180; // convert miles to radians
  const query = {
    geo: {
      $near: [req.query.lon, req.query.lat],
      $maxDistance: maxDistance,
    },
  };

  Location.find(query)
  .limit(limit)
  .populate('products')
  .populate('facilities')
  .populate('activities')
  .exec((err, data) => {
    if (err) {
      res.send(err);
    } else {
      Location.count(query, (totalErr, total) => {
        if (err) res.send(err);
        const count = data ? data.length : 0;
        res.send({
          count,
          hasMore: count < total,
          rows: data,
        });
      });
    }
  });
};
