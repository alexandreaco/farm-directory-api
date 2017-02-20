var debug = require('debug')('app');
import Facility from '../models/facility.model';

export const addFacility = (facility) => {
  return new Promise(resolve => {
    Facility.findOne({ name: facility.trim() }, (err, foundFacility) => {
      if (err) {
        debug(err);
      } else {
        if (foundFacility && foundFacility._id) {
          resolve(foundFacility._id);
        } else {
          const newFacility = new Facility({ name: facility.trim() });
          newFacility.save((err, newFac) => {
            resolve(newFac._id);
          });
        }
      }
    });
  });
}
