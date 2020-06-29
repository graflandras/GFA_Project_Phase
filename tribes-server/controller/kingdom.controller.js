const kingdomService = require('../services/kingdom.service');

const getKingdomAll = (req, res) => {
  const { userId } = req.user;
  kingdomService.getKingdomAll(userId)
    .then(mykingdom => res.status(200).json(mykingdom))
    .catch(error => res.status(500).json(error));
};

const putKingdom = (req, res) => {
  const { kingdomId } = req.user;
  kingdomService.putKingdom(req.body, kingdomId)
    .then(kingdoms => res.json(kingdoms))
    .catch(error => res.status(500).json(error));
};

const getKingdomAllBuildings = (req, res) => {
  const { kingdomId } = req.user;
  kingdomService.getKingdomAllBuildings(kingdomId)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
};

const getLeaderboardTroops = (req, res) => {
  kingdomService.getLeaderboardTroops()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
};

module.exports = {
  getKingdomAll,
  putKingdom,
  getKingdomAllBuildings,
  getLeaderboardTroops,
};
