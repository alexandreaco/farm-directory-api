import Product from '../../models/product.model';

const debug = require('debug')('app');

const addProduct = product => (
  new Promise((resolve) => {
    Product.findOne({ name: product.trim() }, (err, foundProduct) => {
      if (err) {
        debug(err);
      } else if (foundProduct && foundProduct._id) {
        resolve(foundProduct._id);
      } else {
        const newProduct = new Product({ name: product.trim() });
        newProduct.save((newProductErr, newProd) => {
          resolve(newProd._id);
        });
      }
    });
  })
);
export default addProduct;
