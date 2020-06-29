const Kingdom = require('../models/kingdom');
const Resource = require('../models/resources');

const getKingdomResource = id => new Promise((fullfill, reject) => {
  Kingdom.findById(id)
    .populate('resources -_id', 'resources amount generation type -_id')
    .select('resources')
    .exec((error, myresource) => (error ? reject(error) : fullfill(myresource)));
});

const getKingdomResourceType = (id, resourceType) => new Promise((fullfill, reject) => {
  Kingdom.findById(id)
    .populate({
      path: 'resources',
      match: { type: resourceType },
      select: 'amount generation type -_id',
    })
    .select('resources -_id')
    .exec((error, resources) => (error ? reject(error) : fullfill(resources.resources[0])));
});

const updateResource = id => new Promise((fullfill, reject) => {
  Kingdom.findById(id)
    .then((currentKingdom) => {
      const { resources } = currentKingdom;
      resources.forEach((element) => {
        Resource.findById(element)
          .then((currentResource) => {
            const time = Date.now();
            const elapsedTime = time - currentResource.updatedTime;
            const elapsedTimeinSec = Math.round(elapsedTime / 1000);
            const newAmountOfResource = elapsedTimeinSec * currentResource.generation;
            const fullUpdatedAmount = currentResource.amount + newAmountOfResource;
            Resource.findByIdAndUpdate((element), {
              $set: { amount: fullUpdatedAmount, updatedTime: time }, multi: true,
            }, (err) => {
              if (err) {
                reject(err);
              }
              fullfill();
            });
          });
      });
    })
    .catch(err => reject(err));
});

const decreaseResource = (kingdomId, resourceCost, resourceType) => new Promise((fullfill, reject) => {
  Kingdom.findById(kingdomId)
    .populate({
      path: 'resources',
      match: { type: resourceType },
      select: 'amount generation type _id',
    })
    .select('resources -_id')
    .then((resources) => {
      const { _id, amount } = resources.resources[0];
      const newAmount = amount - resourceCost;
      Resource.findByIdAndUpdate((_id), {
        $set: { amount: newAmount }, multi: true,
      }, (err) => {
        if (err) {
          reject(err);
        }
        fullfill();
      });
    });
});

module.exports = {
  updateResource,
  getKingdomResourceType,
  getKingdomResource,
  decreaseResource,
};
