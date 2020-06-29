const request = require('supertest');
const app = require('../index');
const { before } = require('mocha');
const loginUser = require('./loginUserFunction');

describe('PUT /kingdoms', () => {
  const auth = {};
  before(loginUser(auth, 'Viktor', 'cica'));

  it('should update kingdom\'s name, and get back a status code 200', (done) => {
    const data = {
      name: 'hello',
    };
    request(app)
      .put('/kingdoms')
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

  it('should update kingdom\'s location X, and get back a status code 200', (done) => {
    const dataX = {
      x: '987',
    };
    request(app)
      .put('/kingdoms')
      .send(dataX)
      .set('Accept', 'application/json')
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should update kingdom\'s location Y, and get back a status code 200', (done) => {
    const dataY = {
      y: '987',
    };
    request(app)
      .put('/kingdoms')
      .send(dataY)
      .set('Accept', 'application/json')
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should update kingdom\'s location X and Y, and get back a status code 200', (done) => {
    const location = {
      x: '123',
      y: '123',
    };
    request(app)
      .put('/kingdoms')
      .send(location)
      .set('Accept', 'application/json')
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should return 500 status code if we don\'t send data', (done) => {
    const nullData = {
    };
    request(app)
      .put('/kingdoms')
      .send(nullData)
      .set('Accept', 'application/json')
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should return 500 status code if we send other data', (done) => {
    const invalidData = {
      notValidParameter: 'haho',
    };
    request(app)
      .put('/kingdoms')
      .send(invalidData)
      .set('Accept', 'application/json')
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('PUT /kingdoms', () => {
  it('should return 403 status code in case of not valid or missing token', (done) => {
    request(app)
      .put('/kingdoms')
      .expect('Content-Type', /json/)
      .expect(403)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
