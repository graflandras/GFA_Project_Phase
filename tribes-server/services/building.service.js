const Building = require('../models/building');
const Kingdom = require('../models/kingdom');
const resourcesService = require('./resources.service');
require('../models/resources');

const postBuilding = (type, kingdomId) => new Promise((fullfill, reject) => {
  checkIfTheresEnoughGold(kingdomId, 250)
    .then((resultEnoughGold) => {
      if (!resultEnoughGold) {
        reject({ //eslint-disable-line
          status: 'error',
          message: 'Not enough gold!',
        });
      } else {
        const newBuilding = new Building({ type });
        resourcesService.decreaseResource(kingdomId, 250, 'gold');
        newBuilding.save((error, buildings) => {
          if (error) {
            reject(error);
          } else if (type === 'townhall') {
            reject({ err: 'you can have only one townhall' }); //eslint-disable-line
          } else if (type === 'academy') {
            reject({ err: 'you can have only one academy' }); //eslint-disable-line
          } else {
            fullfill(buildings);
          }
        });
      }
    })
    .catch(error => reject(error));
});

const attachKingdom = (kingdomId, buildingId) => new Promise((reject) => {
  Kingdom.findOneAndUpdate({ _id: kingdomId }, { $push: { buildings: buildingId } }, (err) => {
    if (err) {
      reject(err);
    }
  });
});

const getBuildingById = buildingId => new Promise((fullfill, reject) => {
  Building.findById(buildingId)
    .then((error, buildings) => {
      if (error) {
        reject(error);
      } else {
        fullfill(buildings);
      }
    });
});

const checkTownhallLevel = (kingdomId, buildingId) => new Promise((fullfill, reject) => {
  Kingdom.findOne({ _id: kingdomId })
    .populate('buildings -_id')
    .select('buildings')
    .exec((err, data) => {
      if (err) {
        reject(err);
      } else {
        let myTownhall = {};
        data.buildings.forEach((element) => {
          if (element.type === 'townhall') {
            myTownhall = element;
          }
        });
        Building.findOne({ _id: buildingId })
          .then((myBuilding) => {
            fullfill(myBuilding.type !== 'townhall' && myBuilding.level < myTownhall.level);
          })
          .catch(error => reject(error));
      }
    });
});

const getAcademyLevel = kingdomId => new Promise((resolve) => {
  Kingdom.findOne({ _id: kingdomId })
    .populate('buildings')
    .select('buildings')
    .then((buildings) => {
      let academyLevel = 0;
      buildings.buildings.forEach((e) => {
        if (e.type === 'academy') {
          academyLevel = e.level;
        }
      });
      resolve(academyLevel);
    });
});

const checkIfTheresEnoughGold = (kingdomId, neededamount) => new Promise((fullfill, reject) => {
  Kingdom.findOne({ _id: kingdomId })
    .populate('resources -_id')
    .select('resources')
    .exec((error, resourceData) => {
      if (error) {
        reject(error);
      } else {
        let myGolds = {};
        resourceData.resources.forEach((resourceElement) => {
          if (resourceElement.type === 'gold') {
            myGolds = resourceElement;
          }
        });
        fullfill(myGolds.amount > neededamount);
      }
    });
});

const upgradeBuilding = (buildingId, kingdomId, actualLevel) => new Promise((fullfill, reject) => {
  Building.findOne({ _id: buildingId })
    .then((myBuilding) => {
      if (!actualLevel) {
        reject({ //eslint-disable-line
          status: 'error',
          message: 'Missing parameter(s): level!',
        });
      } else if (!checkIfTheresEnoughGold(kingdomId, 100)) {
        reject({ //eslint-disable-line
          status: 'error',
          message: 'Not enough gold!',
        });
      } else if (!checkTownhallLevel(kingdomId, buildingId)) {
        reject({ //eslint-disable-line
          status: 'error',
          message: 'Upgrade is not allowed! You cant go above the townhall level',
        });
      } else if (myBuilding.type === 'townhall' && myBuilding.level === 10) {
        reject({ //eslint-disable-line
          status: 'error',
          message: 'You cant upgrade your townhall above this level, the maximum level is 10. Youre on top!',
        });
      } else if (checkTownhallLevel(kingdomId, buildingId) && myBuilding.level > actualLevel) {
        reject({ //eslint-disable-line
          status: 'error',
          message: 'You can\'t downgrade!',
        });
      } else if (checkTownhallLevel(kingdomId, buildingId) && (myBuilding.level == actualLevel)) { //eslint-disable-line
        resourcesService.decreaseResource(kingdomId, 100, 'gold');
        myBuilding.updateOne({ $set: { level: (parseInt(actualLevel) + 1), started_at: Date.now(), finished_at: ((Date.now()) + (10000 * (actualLevel + 1))) }, multi: true, }, (error) => { //eslint-disable-line
          if (error) {
            reject(error);
          } else {
            Building.findOne({ _id: buildingId })
              .then(updatedBuilding => fullfill(updatedBuilding));
          }
        });
      } else {
        reject({ //eslint-disable-line
          status: 'error',
          message: 'You can\'t upgrade more levels, only to the next!',
        });
      }
    });
});

module.exports = {
  postBuilding,
  attachKingdom,
  getBuildingById,
  upgradeBuilding,
  getAcademyLevel,
};
