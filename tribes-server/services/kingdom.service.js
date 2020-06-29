require('mongoose');
const Kingdom = require('../models/kingdom');
const Location = require('../models/location');
const Building = require('../models/building');
const Resource = require('../models/resources');
require('../models/user');
require('../models/construction');

const getKingdomAll = userid => new Promise((fullfill, reject) => {
  Kingdom.findOne({ userId: userid })
    .populate('locations')
    .exec((error, mykingdom) => (error ? reject(error) : fullfill(mykingdom)));
});

const createDefaultKingdomParams = (body, users) => new Promise((fullfill) => {
  const newLocation = new Location();
  newLocation.save();
  const newTownhall = new Building({ type: 'townhall' });
  newTownhall.save();
  const newAcademy = new Building({ type: 'academy' });
  newAcademy.save();
  const newMine = new Building({ type: 'mine' });
  newMine.save();
  const newFarm = new Building({ type: 'farm' });
  newFarm.save();
  const newFood = new Resource({ type: 'food' });
  newFood.save();
  const newGold = new Resource({ type: 'gold' });
  newGold.save();
  const newKingdom = new Kingdom({
    name: body,
    userId: users._id,
    buildings: [newTownhall._id, newAcademy._id, newMine._id, newFarm._id],
    resources: [newFood, newGold],
    locations: newLocation._id,
  });
  fullfill(newKingdom);
});

const postKingdom = (body, users) => new Promise((fullfill, reject) => {
  createDefaultKingdomParams(body, users).then((newKingdom) => {
    newKingdom.save((error, myNewKingdom) => {
      if (error) {
        reject(error);
      } else {
        fullfill(myNewKingdom);
      }
    });
  });
});

const getKingdomAllBuildings = kingdomId => new Promise((fullfill, reject) => {
  Kingdom.findById(kingdomId)
    .populate('buildings -_id')
    .select('buildings')
    .exec((error, kingdoms) => (error ? reject(error) : fullfill(kingdoms.buildings)));
});


const putKingdom = (body, id) => new Promise((fullfill, reject) => {
  const update = (dataToBeUpdated, currentKingdom) => {
    Location.findOneAndUpdate({ _id: currentKingdom.locations }, dataToBeUpdated, (err) => {
      if (err) {
        reject(err);
      } else {
        fullfill(currentKingdom);
      }
    });
  };
  Kingdom.findOne({ _id: id })
    .then((currentKingdom) => {
      if (body.name) {
        currentKingdom.updateOne({ $set: { name: body.name } }, (err) => {
          if (err) {
            reject(err);
          } else {
            Kingdom.findOne({ _id: id })
              .then(updatedKingdom => fullfill(updatedKingdom));
          }
        });
      } else if (body.x && !body.y) {
        update({ $set: { x: body.x } }, currentKingdom);
      } else if (body.y && !body.x) {
        update({ $set: { y: body.y } }, currentKingdom);
      } else if (body.x && body.y) {
        update({ $set: { x: body.x, y: body.y }, multi: true }, currentKingdom);
      } else {
        reject({ err: 'please give valid parameter' });  //eslint-disable-line
      }
    })
    .catch(err => reject(err));
});

const getKingdomByUserID = userId => new Promise((fullfill, reject) => {
  Kingdom.findOne({ userId }, (error, currentKingdom) => {
    if (error) {
      reject(error);
    } else {
      fullfill(currentKingdom);
    }
  });
});

const getLeaderboardTroops = () => new Promise((fullfill, reject) => {
  Kingdom.find({}, (error, allKingdoms) => {
    if (error) {
      reject(error);
    } else {
      const kingdoms = [];
      allKingdoms.forEach((kingdom) => {
        const myKingdom = {
          kingdomname: kingdom.name,
          troops: kingdom.troops.length,
        };
        kingdoms.push(myKingdom);
      });
      kingdoms.sort((a, b) => b.troops - a.troops);
      fullfill(kingdoms);
    }
  });
});

module.exports = {
  getKingdomAll,
  postKingdom,
  getKingdomAllBuildings,
  putKingdom,
  getKingdomByUserID,
  getLeaderboardTroops,
};
