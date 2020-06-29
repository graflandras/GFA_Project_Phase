const express = require('express');

const router = express.Router();

const authController = require('../controller/auth.controller');
const buildingController = require('../controller/building.controller');
const kingdomController = require('../controller/kingdom.controller');
const userController = require('../controller/user.controller');
const resourceController = require('../controller/resource.controller');
const troopController = require('../controller/troop.controller');
const verifyToken = require('../controller/verifyToken.controller');
const mapController = require('../controller/map.controller');

router.post('/login', userController.userLogin);

router.post('/register', userController.userRegister);

router.post('/auth', authController.authVerifyToken);

router.get('/kingdom', verifyToken, kingdomController.getKingdomAll);

router.put('/kingdoms', verifyToken, resourceController.updateAllresource, kingdomController.putKingdom);

router.get('/kingdom/buildings', verifyToken, kingdomController.getKingdomAllBuildings);

router.get('/kingdom/buildings/:buildingId', verifyToken, buildingController.getBuildingById);

router.put('/kingdom/buildings/:buildingId', verifyToken, resourceController.updateAllresource, buildingController.upgradeBuilding);

router.post('/kingdom/buildings', verifyToken, resourceController.updateAllresource, buildingController.postBuilding);

router.get('/kingdom/resource', verifyToken, resourceController.updateAllresource, resourceController.getKingdomResource);

router.get('/kingdom/resource/:resourceType', verifyToken, resourceController.updateAllresource, resourceController.getKingdomResourceType);

router.post('/kingdom/troops', verifyToken, resourceController.updateAllresource, troopController.addTroop);

router.put('/register/map', mapController.addMapToKingdom);

router.get('/kingdom/map', mapController.getAllMap);

router.get('/leaderboard/troops', verifyToken, kingdomController.getLeaderboardTroops);

router.put('/kingdom/troops/:kingdomId', verifyToken, troopController.upgradeTroops);

router.get('/kingdom/troops', verifyToken, troopController.getAllTroops);

router.post('/kingdom/attack', verifyToken, troopController.attackKingdom)

module.exports = router;
