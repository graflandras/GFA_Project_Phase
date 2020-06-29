const mongoose = require('mongoose');

const { Schema } = mongoose;

const Resource = new Schema({
  type: {
    type: String,
    enum: ['food', 'gold'],
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  generation: {
    type: Number,
    default: 1,
  },
  updatedTime: {
    type: Number,
    timestamp: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Resource', Resource);

