var debug = require('debug')('app');
import { addActivity } from './addActivity';

const addListOfActivities = (activities) => {
  const activityPromises = activities.map(activity => {
    return addActivity(activity);
  })
  return Promise.all(activityPromises);
}

export const processActivityList = (line, keys, i) => {
  if (line[keys.indexOf('ActivityList')].length > 0) {
    const activities = line[keys.indexOf('ActivityList')].split("   ");
    return addListOfActivities(activities)
  }
  return Promise.resolve({})
};
