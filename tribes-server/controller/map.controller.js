const mapService = require('../services/map.service');

const addMapToKingdom = (req, res) => {
  const { choosedKingdom, kingdomId } = req.body;
  if (!choosedKingdom || choosedKingdom.length > 3) {
    res.status(404).json({
      status: 'error',
      message: 'please add valid countrycode',
    });
  } else {
    mapService.attachMapToKingdom(kingdomId, choosedKingdom)
      .then(data => res.status(200).json(data))
      .catch(() => res.status(404).json({
        status: 'error',
        message: 'something went wrong :(',
      }));
  }
};

const getAllMap = (req, res) => {
  mapService.getAllMap()
    .then(data => res.status(200).json({ kingdoms: data }))
    .catch(() => res.status(404).json({
      status: 'error',
      message: 'something went wrong :(',
    }));
};

module.exports = {
  addMapToKingdom,
  getAllMap,
};
