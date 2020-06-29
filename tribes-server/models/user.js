require('dotenv').config();
const mongoose = require('mongoose');

const { Schema } = mongoose;
const crypto = require('crypto');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  kingdomId: {
    type: Schema.Types.ObjectId,
    ref: 'Kingdom',
  },
  password: {
    type: String,
    required: true,
  },
});

User.methods.setPassword = function setPassword(password) {
  this.password = crypto.pbkdf2Sync(password, process.env.SALT, 10000, 512, 'sha512').toString('hex');
};

User.methods.validPassword = function validPassword(password) {
  const hash = crypto.pbkdf2Sync(password, process.env.SALT, 10000, 512, 'sha512').toString('hex');
  return this.password === hash;
};

module.exports = mongoose.model('User', User);
