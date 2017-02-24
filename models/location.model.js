//---
// Location model

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = mongoose.Schema({
  name: String,
  description: String,
  type: String,
  contact: {
    website: String,
    facebook: String,
    twitter: String,
    youtube: String,
    instagram: String,
  },
  address: {
    street: String,
    city: String,
    county: String,
    state: String,
    zip: String,
  },
  loc: {
    lat: String,
    lon: String,
  },
  payment: {
    hasCredit: Boolean,
    hasWIC: Boolean,
    hasWICcash: Boolean,
    hasSFMNP: Boolean,
    hasSNAP: Boolean,
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  stateID: String,
  seasons: [{
    days: String,
    time: String,
    notes: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  }],
  facilities: [{ type: Schema.Types.ObjectId, ref: 'Facility' }],
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
});

const Location = mongoose.model('Location', locationSchema);
export default Location;
