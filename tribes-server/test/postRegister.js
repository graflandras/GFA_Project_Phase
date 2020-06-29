const request = require('supertest');
const app = require('../index');

describe('POST /register', () => {
  it('should get a status code \'200\' (all data ok)', (done) => {
    const data = {
      username: 'helloka 1234',
      password: 'supertest',
      kingdom: 'supertest',
    };
    request(app)
      .post('/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'200\' (no kingdom name, defaults to username\'s kingdom)', (done) => {
    const data = {
      username: 'no kingdomname test 12345',
      password: 'supertest',
    };
    request(app)
      .post('/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'400\' (no username)', (done) => {
    const data = {
      password: 'no username',
    };
    request(app)
      .post('/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'400\' (no password)', (done) => {
    const data = {
      username: 'no password',
    };
    request(app)
      .post('/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'409\' (duplicate username)', (done) => {
    const data = {
      username: 'teszt',
      password: 'duplicate user',
    };
    request(app)
      .post('/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'400\' (sending random data)', (done) => {
    const data = {
      random: 'data',
    };
    request(app)
      .post('/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
