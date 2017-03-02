import Product from './product.model';

const expect = require('chai').expect;

describe('Product.model', () => {
  it('should be invalid if name is empty', (done) => {
    const a = new Product();
    a.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
});
