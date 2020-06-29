const request = require('supertest');
const app = require('../index');
const { before } = require('mocha');
const loginUser = require('./loginUserFunction');

describe('GET kingdom/resource', () => {
  const auth = {};
  before(loginUser(auth, 'Viktor', 'cica'));

  it('should return the logged in user\'s resources', (done) => {
    request(app)
      .get('/kingdom/resource')
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('GET /kingdom/resource', () => {
  it('should return 403 status code in case of not valid or missing token', (done) => {
    request(app)
      .get('/kingdom/resource')
      .expect('Content-Type', /json/)
      .expect(403)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
