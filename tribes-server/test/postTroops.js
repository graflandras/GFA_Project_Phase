const request = require('supertest');
const app = require('../index');
const { before } = require('mocha');
const loginUser = require('./loginUserFunction');

describe('POST /kingdom/troops', () => {
  const auth = {};
  before(loginUser(auth, 'Viktor', 'cica'));

  it('should get a status code \'200\' ', (done) => {
    request(app)
      .post('/kingdom/troops')
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /kingdom/troops', () => {
  it('should return 403 status code in case of not valid or missing token', (done) => {
    request(app)
      .post('/kingdom/troops')
      .expect('Content-Type', /json/)
      .expect(403)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
