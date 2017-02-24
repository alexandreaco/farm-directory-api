import Location from '../../models/location.model';
import processSeason from './processSeason';
import processActivityList from './processActivityList';
import processFacilities from './processFacilities';
import { slugify } from '../helpers';

const debug = require('debug')('app');

const processFarm = (line, keys, i) => {
  debug(`on line ${i}`);
  const farm = {
    name: line[keys.indexOf('marketname')],
    type: 'farm',
    contact: {
      website: line[keys.indexOf('Market_Website')],
      facebook: line[keys.indexOf('Market_Facebook')],
      twitter: line[keys.indexOf('Market_Twitter')],
    },
    address: {
      street: line[keys.indexOf('Location_ST')],
      city: line[keys.indexOf('Location_City')],
      state: line[keys.indexOf('Location_State')],
      zip: line[keys.indexOf('Location_Zip')],
    },
    loc: {
      lat: line[keys.indexOf('y')],
      lon: line[keys.indexOf('x')],
    },
    payment: {
    },
    stateID: slugify(line[keys.indexOf('Location_State')]),
  };

  const farmPromises = [
    processSeason(line, keys, 'season1'),
    processSeason(line, keys, 'season2'),
    processSeason(line, keys, 'season3'),
    processSeason(line, keys, 'season4'),
  ];

  return Promise.all(farmPromises)
  .then((seasons) => {
    farm.seasons = seasons;
    return processActivityList(line, keys)
    .then((activities) => {
      farm.activities = activities;
      return processFacilities(line, keys)
      .then((facilities) => {
        farm.facilities = facilities;

        // save in DB
        const newFarmLocation = new Location(farm);
        newFarmLocation.save((err) => {
          debug(err);
        });
        return farm;
      });
    });
  });
};

export default processFarm;
