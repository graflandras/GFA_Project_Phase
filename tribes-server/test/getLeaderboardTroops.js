const request = require('supertest');
const app = require('../index');
const { before } = require('mocha');
const loginUser = require('./loginUserFunction');

describe('GET /leaderboard/troops', () => {
  const auth = {};
  before(loginUser(auth, 'Evi', 'cica'));

  it('should return 200 status code', (done) => {
    request(app)
      .get('/leaderboard/troops')
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('GET /leaderboard/troops', () => {
  it('should return 403 status code in case of not valid or missing token', (done) => {
    request(app)
      .get('//leaderboard/troops')
      .expect('Content-Type', /json/)
      .expect(403)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
