const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');

const user = {
  username: 'Viktor',
  password: 'cica',
};

describe('POST /Login', () => {
  it('should get a status code \'200\' if all data ok', (done) => {
    request(app)
      .post('/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
          .with.property('status')
          .that.is.a('string')
          .that.equal('ok');
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'400\' if no username and password', (done) => {
    request(app)
      .post('/login')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
          .with.property('message')
          .that.is.a('string')
          .that.equal('Missing parameters: username, password!');
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'400\' if no username', (done) => {
    user.username = null;
    user.password = 'blabla';
    request(app)
      .post('/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
          .with.property('message')
          .that.is.a('string')
          .that.equal('Missing parameter: username!');
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'400\' if no password', (done) => {
    user.username = 'Viktor';
    user.password = null;
    request(app)
      .post('/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
          .with.property('message')
          .that.is.a('string')
          .that.equal('Missing parameter: password!');
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'400\' if the password is wrong', (done) => {
    user.password = 'blabla';
    request(app)
      .post('/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
          .with.property('message')
          .that.is.a('string')
          .that.equal('Wrong password!');
        if (err) return done(err);
        return done();
      });
  });

  it('should get a status code \'401\' if the username is wrong', (done) => {
    user.username = 'blabla';
    request(app)
      .post('/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
          .with.property('message')
          .that.is.a('string')
          .that.equal(`no such user: ${user.username}`);
        if (err) return done(err);
        return done();
      });
  });
});
