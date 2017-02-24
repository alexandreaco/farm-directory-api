//---
// Facility model

const mongoose = require('mongoose');

const facilitySchema = mongoose.Schema({
  name: String,
});

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;
