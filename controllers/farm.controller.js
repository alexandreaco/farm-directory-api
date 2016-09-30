import Farm from '../models/farm.model';
import { slugify } from '../util/actions.js';

export const getAllFarms = (req, res) => {
  Farm.find({}, function (err, farms) {
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
    res.send(farms);
    console.log(`found ${farms.length} farms`);
  });
}
