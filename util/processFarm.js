var debug = require('debug')('app');
import { processSeason } from './processSeason';
import { processActivityList } from './processActivityList';

export const slugify = (string) => {
  return string.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export const processFarm = (line, keys, i) => {
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
    stateID: slugify(line[keys.indexOf('Location_State')],),
  }

  const farmPromises = [
    processSeason(line, keys, 'season1', i),
    processSeason(line, keys, 'season2', i),
    processSeason(line, keys, 'season3', i),
    processSeason(line, keys, 'season4', i),
  ];

  return Promise.all(farmPromises)
  .then(seasons => {
    farm.seasons = seasons;
    return processActivityList(line, keys, i)
    .then(activities => {
      farm.activities = activities;
      return farm;
    })
  })
}
