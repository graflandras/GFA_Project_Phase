const Kingdom = require('../models/kingdom');
const Location = require('../models/location');

const attachMapToKingdom = (kingdomId, locationCode) => new Promise((fulfill, reject) => {
  Kingdom.findOne({ _id: kingdomId })
    .then((currentKingdom) => {
      Location.findOneAndUpdate({ _id: currentKingdom.locations }, { $set: { countrycode: locationCode } }, (err, location) => {
        if (err) {
          reject(err);
        } else {
          fulfill(location);
        }
      });
    });
});

const getAllMap = () => new Promise((fulfill, reject) => {
  Kingdom.find()
    .populate('locations')
    .then((allKingdom) => {
      const prettyAllKingdom = allKingdom.map(element => ({
        kingdom_id: element._id,
        kindom_name: element.name,
        population: element.troops.length,
        location: element.locations.map(value => value.countrycode),
      }),
      );
      fulfill(prettyAllKingdom);
    })
    .catch(err => reject(err));
});

module.exports = {
  attachMapToKingdom,
  getAllMap,
};
