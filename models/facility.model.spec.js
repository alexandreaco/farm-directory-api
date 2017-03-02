import Facility from './facility.model';

const expect = require('chai').expect;

describe('Facility.model', () => {
  it('should be invalid if name is empty', (done) => {
    const a = new Facility();
    a.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
});
