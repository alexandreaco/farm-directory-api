//---
// Activity model

var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
  name: String,
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
