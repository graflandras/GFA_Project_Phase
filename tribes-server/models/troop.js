const mongoose = require('mongoose');

const { Schema } = mongoose;

const Troop = new Schema({
  level: {
    type: Number,
    default: 1,
  },
  hp: {
    type: Number,
    default: 1,
  },
  attack: {
    type: Number,
    default: 1,
  },
  defence: {
    type: Number,
    default: 1,
  },
  started_at: {
    type: Number,
    timestamp: true,
    default: Date.now(),
  },
  finished_at: {
    type: Number,
    timestamp: true,
    default: (function finish() {
      return (this.started_at + 1000);
    }),
  },
});

module.exports = mongoose.model('Troop', Troop);
