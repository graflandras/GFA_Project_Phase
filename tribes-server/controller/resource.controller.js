const resourceService = require('../services/resources.service');

const getKingdomResource = (req, res) => {
  resourceService.getKingdomResource(req.user.kingdomId)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
};

const getKingdomResourceType = (req, res) => {
  const { resourceType } = req.params;
  if (resourceType === 'gold' || resourceType === 'food') {
    resourceService.getKingdomResourceType(req.user.kingdomId, resourceType)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json(error));
  } else {
    res.status(500).json({
      status: 'error',
      message: `${resourceType} not found`,
    });
  }
};

const updateAllresource = (req, res, next) => {
  const { kingdomId } = req.user;
  resourceService.updateResource(kingdomId)
    .then(() => {
      next();
    })
    .catch(error => res.status(500).json(error));
};

module.exports = {
  getKingdomResource,
  getKingdomResourceType,
  updateAllresource,
};
