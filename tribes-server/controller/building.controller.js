const buildingService = require('../services/building.service');

const getBuildingById = (req, res) => {
  const { buildingId } = req.params;
  buildingService.getBuildingById(buildingId)
    .then(data => res.status(200).json(data))
    .catch(() => res.status(404).json({
      status: 'error',
      message: `${buildingId} not found.`,
    }));
};

const postBuilding = (req, res) => {
  const { kingdomId } = req.user;
  const { type } = req.body;
  if (type === 'mine' || type === 'farm' || type === 'academy') {
    buildingService.postBuilding(type, kingdomId)
      .then((buildings) => {
        if (buildings) {
          buildingService.attachKingdom(kingdomId, buildings.id);
          res.status(200).json(buildings);
        }
      })
      .catch(error => res.status(400).json(error));
  } else if (!type) {
    res.status(400).json({
      status: 'error',
      message: 'Missing parameter(s): type!',
    });
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Invalid building type!',
    });
  }
};

const upgradeBuilding = (req, res) => {
  const { buildingId } = req.params;
  const { kingdomId } = req.user;
  const { actualLevel } = req.body;
  buildingService.upgradeBuilding(buildingId, kingdomId, actualLevel)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
};

module.exports = {
  getBuildingById,
  postBuilding,
  upgradeBuilding,
};
