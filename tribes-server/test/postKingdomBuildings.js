const request = require('supertest');
const app = require('../index');
const { before } = require('mocha');
const loginUser = require('./loginUserFunction');

describe('POST /kingdom/buildings', () => {
  const auth = {};
  before(loginUser(auth, 'Viktor', 'cica'));

  it('should get a status code \'200\' (mine - all data ok)', (done) => {
    request(app)
      .post('/kingdom/buildings')
      .set('TOKEN', auth.token)
      .send({ type: 'mine' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'200\' (farm - all data ok)', (done) => {
    request(app)
      .post('/kingdom/buildings')
      .set('TOKEN', auth.token)
      .send({ type: 'farm' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'200\' (academy - all data ok)', (done) => {
    request(app)
      .post('/kingdom/buildings')
      .set('TOKEN', auth.token)
      .send({ type: 'academy' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'400\' (missing type)', (done) => {
    const data = {};
    request(app)
      .post('/kingdom/buildings')
      .send(data)
      .set('TOKEN', auth.token)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'400\' (forbidden type (townhall))', (done) => {
    request(app)
      .post('/kingdom/buildings')
      .set('TOKEN', auth.token)
      .send({ type: 'townhall' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'400\' (random data)', (done) => {
    request(app)
      .post('/kingdom/buildings')
      .set('TOKEN', auth.token)
      .send({ type: 'rozi' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /kingdom/buildings', () => {
  it('should return 403 status code in case of not valid or missing token', (done) => {
    request(app)
      .post('/kingdom/buildings')
      .expect('Content-Type', /json/)
      .expect(403)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
