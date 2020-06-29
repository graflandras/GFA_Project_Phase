const mongoose = require('mongoose');

const { Schema } = mongoose;
const buildingsBuildingTime = require('./construction');

const Building = new Schema({
  type: {
    type: String,
    enum: Object.keys(buildingsBuildingTime),
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  hp: {
    type: Number,
    default: 1,
  },
  started_at: {
    type: Number,
    timestamp: true,
    default: Date.now,
  },
  finished_at: {
    type: Number,
    timestamp: true,
    default: (function finish() {
      return (this.started_at + buildingsBuildingTime[this.type]);
    }),
  },
}, { versionKey: false },
);


module.exports = mongoose.model('Building', Building);
