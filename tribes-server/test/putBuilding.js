const request = require('supertest');
const app = require('../index');
const { before } = require('mocha');
const loginUser = require('./loginUserFunction');

describe('PUT /kingdom/buildings/:buildingId', () => {
  const auth = {};
  before(loginUser(auth, 'Evi', 'cica'));

  it('should update the building level, and get back a status code 200', (done) => {
    const buildingId = '5c6f0d0e0b5705c71c1f7018';
    const data = {
      newLevel: '7',
    };
    request(app)
      .put(`/kingdom/buildings/${buildingId}`)
      .send(data)
      .set('Accept', 'application/json')
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code  \'500\' if we dont provide building id', (done) => {
    const buildingId = null;
    request(app)
      .put(`/kingdom/buildings/${buildingId}`)
      .set('token', auth.token)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('PUT /kingdom/buildings/:buildingId', () => {
  it('should return 403 status code in case of not valid or missing token', (done) => {
    const buildingId = null;
    request(app)
      .put(`/kingdom/buildings/${buildingId}`)
      .expect('Content-Type', /json/)
      .expect(403)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
