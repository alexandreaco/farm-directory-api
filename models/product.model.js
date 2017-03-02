//---
// Product model

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
