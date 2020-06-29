const User = require('../models/user');
require('../models/kingdom');

const postUser = (username, password) => new Promise((fullfill, reject) => {
  const newUser = new User({
    username,
    password,
  });
  newUser.setPassword(password);
  newUser.save((error, users) => {
    if (error) {
      reject(error);
    } else {
      fullfill(users);
    }
  });
});

const attachKingdom = (username, kingdomId) => new Promise((fullfill, reject) => {
  User.findOneAndUpdate({ username }, { kingdomId }, { new: true }, (error, updatedUser) => {
    if (error) {
      reject(error);
    } else {
      fullfill(updatedUser);
    }
  });
});

const getUser = username => new Promise((fullfill, reject) => {
  User.findOne({ username }, (error, user) => {
    if (error) {
      reject(error);
    } else {
      fullfill(user);
    }
  });
});

module.exports = {
  postUser,
  getUser,
  attachKingdom,
};
