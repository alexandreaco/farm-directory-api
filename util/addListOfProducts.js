var debug = require('debug')('app');
import { addProduct } from './addProduct';

export const addListOfProducts = (products) => {
  const productPromises = products.map(product => {
    return addProduct(product);
  })
  return Promise.all(productPromises);
}
