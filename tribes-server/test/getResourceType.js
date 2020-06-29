const request = require('supertest');
const app = require('../index');
const loginUser = require('./loginUserFunction');
const { before } = require('mocha');

let reqParams = 'test';

describe('GET Resource /kingdom / resource / type', () => {
  const auth = {};
  before(loginUser(auth, 'Viktor', 'cica'));
  it('should get a status code  \'500\' if the params is not food or gold', (done) => {
    request(app)
      .get(`/kingdom/resource/${reqParams}`)
      .set('token', auth.token)
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code  \'200\' if the params is food', (done) => {
    reqParams = 'food';
    request(app)
      .get(`/kingdom/resource/${reqParams}`)
      .set('token', auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code  \'200\' if the params is gold', (done) => {
    reqParams = 'gold';
    request(app)
      .get(`/kingdom/resource/${reqParams}`)
      .set('token', auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
