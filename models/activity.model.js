//---
// Activity model

const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
  name: String,
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
