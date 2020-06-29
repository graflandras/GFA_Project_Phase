const mongoose = require('mongoose');

const { Schema } = mongoose;

const Location = new Schema({
  countrycode: {
    type: String,
  },
});

module.exports = mongoose.model('Location', Location);
