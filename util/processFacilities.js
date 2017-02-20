var debug = require('debug')('app');
import { addFacility } from './addFacility';

const addListOfFacilities = (facilities) => {
  const facilityPromises = facilities.map(facility => {
    return addFacility(facility);
  })
  return Promise.all(facilityPromises);
}

export const processFacilities = (line, keys, i) => {
  if (line[keys.indexOf('FacilitiesList')].length > 0) {
    const facilities = line[keys.indexOf('FacilitiesList')].split("   ");
    return addListOfFacilities(facilities)
  }
  return Promise.resolve({})
};
