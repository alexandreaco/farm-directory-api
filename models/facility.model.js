//---
// Facility model

var mongoose = require('mongoose');

var facilitySchema = mongoose.Schema({
  name: String,
});

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;
