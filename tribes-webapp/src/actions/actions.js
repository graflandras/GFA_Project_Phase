export const getLoginName = (username, password) => ({
  type: 'USER_LOGIN_REQUESTED',
  payload: {
    username,
    password,
  },
});

export const registerUser = (username, password, kingdom) => ({
  type: 'USER_REGISTRATION_REQUESTED',
  payload: {
    username,
    password,
    kingdom,
  },
});

export const getResource = () => ({
  type: 'INITIAL_RESOURCE_REQUESTED',
});

export const resourceUpdater = (foodAmount, diamondAmount) => ({
  type: 'RESOURCE_UPDATER',
  payload: {
    foodAmount,
    diamondAmount,
  },
});

export const authUser = () => ({
  type: 'USER_AUTH_REQUESTED',
});

export const updateKingdomName = newKingdomName => ({
  type: 'KINGDOM_CHANGE_REQUESTED',
  payload: newKingdomName,
});

export const addPercentage = (id, percentage) => ({
  type: 'ADD_PERCENTAGE',
  payload: {
    id,
    percentage,
  },
});

export const changeLog = id => ({
  type: 'CHANGE_LOG',
  payload: {
    id,
  },
});

export const removeBackLog = id => ({
  type: 'REMOVE_FROM_BACK_LOG',
  payload: {
    id,
  },
});

export const clearBacklog = () => ({
  type: 'CLEAR_BACK_LOG',
});


export const getBuildings = () => ({
  type: 'GET_INITIAL_BUILDINGS',
});

export const getBuildingById = id => ({
  type: 'GET_BUILDING_BY_ID',
  payload: id,
});

export const upgradeBuilding = (buildingLevel, buildingId) => ({
  type: 'UPGRADE_BUILDING_REQUESTED',
  payload: {
    actualLevel: buildingLevel,
    buildingId,
  },
});

export const getTakenCountries = () => ({
  type: 'TAKEN_COUNTRIES_REQUESTED',
});

export const saveKingdomToUser = (kingdomId, choosedKingdom) => ({
  type: 'KINGDOM_SELECT_REQUESTED',
  payload: {
    kingdomId,
    choosedKingdom,
  },
});

export const sendBuilding = buildingType => ({
  type: 'SEND_NEW_BUILDING',
  payload: {
    type: buildingType,
  },
});
export const getMyCountry = () => ({
  type: 'GET_MY_COUNTRIES',
});

export const createTroop = () => ({
  type: 'CREATE_TROOP_REQUEST',
});
export const getTroops = () => ({
  type: 'GET_MY_TROOPS',
});

export const attackEnemy = (enemyKingdomId) => ({
  type: 'ATTACK_ENEMY_REQUEST',
  payload: {
    enemyKingdomId: enemyKingdomId
  }
})

export const clearAttackStatus = () => ({
  type: 'CLEAR_ATTACK_STATUS',
})