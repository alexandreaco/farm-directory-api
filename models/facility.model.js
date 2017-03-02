//---
// Facility model

const mongoose = require('mongoose');

const facilitySchema = mongoose.Schema({
  name: { type: String, required: true },
});

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;
