import Activity from '../../models/activity.model';

const debug = require('debug')('app');

const addActivity = activity => (
  new Promise((resolve) => {
    Activity.findOne({ name: activity.trim() }, (err, foundActivity) => {
      if (err) {
        debug(err);
      } else if (foundActivity && foundActivity._id) {
        resolve(foundActivity._id);
      } else {
        const newActivity = new Activity({ name: activity.trim() });
        newActivity.save((newActivityErr, newAct) => {
          resolve(newAct._id);
        });
      }
    });
  })
);

const addListOfActivities = (activities) => {
  const activityPromises = activities.map(activity => (addActivity(activity)));
  return Promise.all(activityPromises);
};

const processActivityList = (line, keys) => {
  if (line[keys.indexOf('ActivityList')].length > 0) {
    const activities = line[keys.indexOf('ActivityList')].split('   ');
    return addListOfActivities(activities);
  }
  return Promise.resolve([]);
};

export default processActivityList;
