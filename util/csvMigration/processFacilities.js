import Facility from '../../models/facility.model';

const debug = require('debug')('app');

const addFacility = facility => (
  new Promise((resolve) => {
    Facility.findOne({ name: facility.trim() }, (err, foundFacility) => {
      if (err) {
        debug(err);
      } else if (foundFacility && foundFacility._id) {
        resolve(foundFacility._id);
      } else {
        const newFacility = new Facility({ name: facility.trim() });
        newFacility.save((newFacilityErr, newFac) => {
          resolve(newFac._id);
        });
      }
    });
  })
);

const addListOfFacilities = (facilities) => {
  const facilityPromises = facilities.map(facility => (addFacility(facility)));
  return Promise.all(facilityPromises);
};

const processFacilities = (line, keys) => {
  if (line[keys.indexOf('FacilitiesList')].length > 0) {
    const facilities = line[keys.indexOf('FacilitiesList')].split('   ');
    return addListOfFacilities(facilities);
  }
  return Promise.resolve([]);
};

export default processFacilities;
