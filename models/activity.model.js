//---
// Activity model

const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
  name: { type: String, required: true },
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
