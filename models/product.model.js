//---
// Product model

var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: String,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
