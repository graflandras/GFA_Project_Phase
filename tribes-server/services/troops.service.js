const CustomError = require('./customError');
const Troop = require('../models/troop');
const Kingdom = require('../models/kingdom');
const buildingService = require('./building.service');
const resourcesService = require('./resources.service');

const addTropMaster = kingdomId => new Promise((fullfill, reject) => {
  const newTroop = new Troop();
  Kingdom.findById(kingdomId)
    .populate({
      path: 'buildings',
      match: { type: 'townhall' },
    })
    .populate({
      path: 'troops',
    })
    .populate({
      path: 'resources',
      match: { type: 'gold' },
    })
    .select('buildings troops resources')
    .then((currentKingdom) => {
      if (currentKingdom.resources[0].amount > 10) {
        if (currentKingdom.troops.length < (currentKingdom.buildings[0].level * 20)) {
          newTroop.save()
            .then((troop) => {
              resourcesService.decreaseResource(kingdomId, 10, 'gold');
              Kingdom.findOneAndUpdate({ _id: kingdomId }, { $push: { troops: troop._id } }, (err) => {
                if (err) {
                  reject(new CustomError('databaseError', 'Something went wrong in database!'));
                }
              });
              Troop.findById(troop._id)
                .then((currentTroop) => { fullfill(currentTroop); });
            });
        } else {
          reject(new CustomError('userError', 'Too much troops! You can create more if your Townhall is on the next level!'));
        }
      } else {
        reject(new CustomError('userError', 'Not enough gold!'));
      }
    })
    .catch(err => reject(new CustomError('databaseError', 'Something went wrong in database!', err)));
});

const getTroopIdsOnGivenLevelwithAmount = (kingdomId, trooplevel, amount) => new Promise((resolve, reject) => {
  const troopIds = [];
  Kingdom.findOne({ _id: kingdomId })
    .populate({
      path: 'troops',
      match: { level: trooplevel - 1 },
    })
    .select('troops')
    .then((troopsOnThatLevel) => {
      if (!troopsOnThatLevel.troops.length) {
        reject(new CustomError(
          'userError', 'You don\'t have enough troops on that level for updating to next level.',
        ));
      }
      buildingService.getAcademyLevel(kingdomId)
        .then((level) => {
          if (level < trooplevel) {
            reject(new CustomError(
              'userError', 'Your academy level is lower then the requested upgrading troop level.',
            ));
          }
          troopsOnThatLevel.troops.forEach((e, i) => {
            if (i < amount) {
              troopIds.push(e._id);
            }
          });
          resolve(troopIds);
        });
    });
});

const getTroopsOnGivenLevel = (kingdomId, trooplevel) => new Promise((resolve, reject) => {
  Kingdom.findOne({ _id: kingdomId })
    .populate({
      path: 'troops',
      match: { level: trooplevel },
    })
    .select('troops')
    .then((troopsOnThatLevel) => {
      resolve(troopsOnThatLevel);
    })
    .catch(err => reject(err));
});

const getAllTroops = kingdomId => new Promise((resolve, reject) => {
  Kingdom.findOne({ _id: kingdomId })
    .populate({
      path: 'troops',
    })
    .select('troops')
    .then(troops => resolve(troops))
    .catch(err => reject(err));
});

const upgradeTroops = (kingdomId, trooplevel, amount) => new Promise((resolve, reject) => {
  getTroopIdsOnGivenLevelwithAmount(kingdomId, trooplevel, amount)
    .then(troops => Promise.all(
      troops.map(item =>
        Troop.updateOne({ _id: item }, { $set: { level: trooplevel } }),
      )))
    .catch(err => reject(err))
    .then(() => {
      getTroopsOnGivenLevel(kingdomId, trooplevel)
        .then((myUpdatedTroops) => {
          resolve(myUpdatedTroops);
        });
    })
    .catch(err => reject(err));
});

const getAttackResult = (kingdomId, enemyKingdomId) => new Promise((fullfill, reject) => {
  Kingdom.findById(kingdomId)
    .populate({
      path: 'buildings troops',
    })
    .select('buildings troops')
    .then((currentKingdom) => {
      myKingdomAttack = getAllAttackOrDefPoint(currentKingdom.troops).attack
      myKingdomDefense = getAllAttackOrDefPoint(currentKingdom.troops).defense
      Kingdom.findById(enemyKingdomId)
        .populate({
          path: 'buildings troops',
        })
        .select('buildings troops')
        .then((currentKingdom) => {
          enemyKingdomAttack = getAllAttackOrDefPoint(currentKingdom.troops).attack
          enemyKingdomDefense = getAllAttackOrDefPoint(currentKingdom.troops).defense
          if (myKingdomAttack > enemyKingdomDefense) {
            fullfill({ message: 'YOU WIN' })
          } else if (myKingdomAttack === enemyKingdomDefense) {
            fullfill({ message: 'DRAW' })
          } else {
            fullfill({ message: 'YOU LOOSE' })
          }
        })
        .catch((error => reject(error)))
    })
    .catch((error => reject(error)))

})

const getAllAttackOrDefPoint = (troopsArray) => {
  let attack = troopsArray.reduce(function (sum, item) {
    return sum + item.attack;
  }, 0);
  let defense = troopsArray.reduce(function (sum, item) {
    return sum + item.defence;
  }, 0);

  return points = {
    attack: attack,
    defense: defense,
  }
}

module.exports = {
  addTropMaster,
  getAttackResult,
  upgradeTroops,
  getAllTroops,
  getTroopsOnGivenLevel,
};
