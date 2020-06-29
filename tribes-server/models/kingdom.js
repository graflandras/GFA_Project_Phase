const mongoose = require('mongoose');

const { Schema } = mongoose;
require('./resources');
require('./location');
require('./building');
require('./user');
require('./troop');

const Kingdom = new Schema({
  name: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  buildings: [{
    type: Schema.Types.ObjectId,
    ref: 'Building',
    default: [],
  }],
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource',
    default: [],
    maxlength: 2,
  }],
  troops: [{
    type: Schema.Types.ObjectId,
    ref: 'Troop',
    default: [],
  }],
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'Location',
    default: [],
  }],
});

module.exports = mongoose.model('Kingdom', Kingdom);
