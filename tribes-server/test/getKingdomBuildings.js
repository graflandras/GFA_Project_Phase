const request = require('supertest');
const app = require('../index');
const { before } = require('mocha');
const loginUser = require('./loginUserFunction');

describe('GET /kingdom/buildings', () => {
  const auth = {};
  before(loginUser(auth, 'Viktor', 'cica'));

  it('should return the logged in user\'s buildings', (done) => {
    request(app)
      .get('/kingdom/buildings')
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('GET /kingdom/buildings', () => {
  it('should return 403 status code in case of not valid or missing token', (done) => {
    request(app)
      .get('/kingdom/buildings')
      .expect('Content-Type', /json/)
      .expect(403)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
