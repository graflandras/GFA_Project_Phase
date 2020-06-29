const troopService = require('../services/troops.service');

const addTroop = (req, res) => {
  const { kingdomId } = req.user;
  troopService.addTropMaster(kingdomId)
    .then(data => res.status(200).json(data))
    .catch((err) => {
      if (err.type === 'userError') {
        res.status(400).json({
          message: err.message,
        });
      } else if (err.type === 'databaseError') {
        res.status(500).json({
          message: err.message,
        });
      }
    });
};

const attackKingdom = (req, res) => {
  const { kingdomId } = req.user;
  const { enemyKingdomId } = req.body;
  troopService.getAttackResult(kingdomId, enemyKingdomId)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
}

const upgradeTroops = (req, res) => {
  const { kingdomId } = req.user;
  const { trooplevel, amount } = req.body;
  troopService.upgradeTroops(kingdomId, trooplevel, amount)
    .then(data => res.status(200).json(data))
    .catch((err) => {
      if (err.type === 'userError') {
        res.status(400).json({
          message: err.message,
        });
      }
    });
};

const getAllTroops = (req, res) => {
  const { kingdomId } = req.user;
  troopService.getAllTroops(kingdomId)
    .then(data => res.status(200).json(data))
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  addTroop,
  upgradeTroops,
  attackKingdom,
  getAllTroops,
};
