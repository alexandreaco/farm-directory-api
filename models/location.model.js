//---
// Location model

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var locationSchema = mongoose.Schema({
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
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Location = mongoose.model('Location', locationSchema);
export default Location;
