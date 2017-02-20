var debug = require('debug')('app');
import Activity from '../models/activity.model';

export const addActivity = (activity) => {
  return new Promise(resolve => {
    Activity.findOne({ name: activity.trim() }, (err, foundActivity) => {
      if (err) {
        debug(err);
      } else {
        if (foundActivity && foundActivity._id) {
          resolve(foundActivity._id);
        } else {
          const newActivity = new Activity({ name: activity.trim() });
          newActivity.save((err, newAct) => {
            resolve(newAct._id);
          });
        }
      }
    });
  });
}
