import addProduct from './addProduct';

const addListOfProducts = (products) => {
  const productPromises = products.map(product => (addProduct(product)));
  return Promise.all(productPromises);
};

export default addListOfProducts;
