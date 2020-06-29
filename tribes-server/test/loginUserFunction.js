const app = require('../index');
const request = require('supertest');

const loginUser = (auth, username, password) => (done) => {
  const onResponse = (err, res) => {
    if (err) return done(err);
    auth.token = res.body.token;    //eslint-disable-line
    return done();
  };
  request(app)
    .post('/login')
    .send({
      username,
      password,
    })
    .expect(200)
    .end(onResponse);
};

module.exports = loginUser;
