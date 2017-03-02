//---
// Location model

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locSubSchema = new Schema({
  lat: String,
  lon: String,
});

const contactSubSchema = new Schema({
  website: String,
  facebook: String,
  twitter: String,
  youtube: String,
  instagram: String,
});

const addressSubSchema = new Schema({
  street: String,
  city: String,
  county: String,
  state: String,
  zip: String,
});

const paymentSubSchema = new Schema({
  hasCredit: Boolean,
  hasWIC: Boolean,
  hasWICcash: Boolean,
  hasSFMNP: Boolean,
  hasSNAP: Boolean,
});

const locationSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  type: { type: String, required: true },
  contact: { type: contactSubSchema },
  address: { type: addressSubSchema },
  loc: { type: locSubSchema, required: true },
  payment: { type: paymentSubSchema },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  stateID: { type: String, required: true },
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
