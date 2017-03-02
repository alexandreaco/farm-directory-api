import Location from './location.model';

const expect = require('chai').expect;

describe('Location.model', () => {
  it('should be invalid if name or location is empty', (done) => {
    const a = new Location();
    a.validate((err) => {
      expect(err.errors.name).to.exist;
      expect(err.errors.geo).to.exist;
      expect(err.errors.type).to.exist;
      expect(err.errors.stateID).to.exist;
      done();
    });
  });
});
