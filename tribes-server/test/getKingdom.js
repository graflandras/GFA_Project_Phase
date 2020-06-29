const request = require('supertest');
const app = require('../index');
const { before } = require('mocha');
const loginUser = require('./loginUserFunction');

describe('GET /kingdom', () => {
  const auth = {};
  before(loginUser(auth, 'Viktor', 'cica'));

  it('should return 200 status code', (done) => {
    request(app)
      .get('/kingdom')
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('GET /kingdom', () => {
  it('should return 403 status code in case of not valid or missing token', (done) => {
    request(app)
      .get('/kingdom')
      .expect('Content-Type', /json/)
      .expect(403)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
