var debug = require('debug')('app');
import Product from '../models/product.model';

export const addProduct = (product) => {
  return new Promise(resolve => {
    Product.findOne({ name: product.trim() }, (err, foundProduct) => {
      debug('finding product');
      if (err) {
        debug(err);
      } else {
        if (foundProduct && foundProduct._id) {
          resolve(foundProduct._id);
        } else {
          const newProduct = new Product({ name: product.trim() });
          newProduct.save((err, newProd) => {
            debug(`added new product ${newProd}`)
            resolve(newProd._id);
          });
        }
      }
    });
  });
}
