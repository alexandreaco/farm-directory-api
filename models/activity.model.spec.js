import Activity from './activity.model';

const expect = require('chai').expect;

describe('Activity.model', () => {
  it('should be invalid if name is empty', (done) => {
    const a = new Activity();
    a.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
});
