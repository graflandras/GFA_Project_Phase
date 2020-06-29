import { delay } from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import * as API from 'services/api';
import { attackEnemy } from '../actions/actions';

function* login(action) {
  try {
    const response = yield call(API.getLoginName, action.payload);
    localStorage.setItem('TOKEN', response.token);
    if (response.status !== 'error') {
      yield put({
        type: 'USER_LOGIN_SUCCEEDED',
        payload: response.status,
      });
      yield put({
        type: 'USER_AUTH_REQUESTED',
      });
    } else {
      yield put({
        type: 'LOGIN_FAILED',
        payload: {
          message: response.message,
        },
      });
    }
  } catch (error) {
    yield put({
      type: 'LOGIN_FAILED',
    });
    console.log(error); // eslint-disable-line
  }
}

function* register(action) {
  try {
    yield delay(100);
    const response = yield call(API.postData, action.payload, 'http://localhost:3000/register');
    if (!response.id) {
      yield put({
        type: 'USER_REGISTRATION_FAILED',
        payload: response,
      });
    } else {
      yield put({
        type: 'USER_REGISTRATION_SUCCESS',
        payload: response,
      });
    }
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
}

function* getResource() {
  try {
    const response = yield call(API.getData, 'http://localhost:3000/kingdom/resource');
    yield put({
      type: 'INITIAL_RESOURCE_UPDATED',
      payload: response,
    });
  } catch (error) {
    yield put({
      type: 'RESOURCE_REQUESTED_FAILED',
    });
    console.log(error); // eslint-disable-line
  }
}

function* authenticate() {
  try {
    const tokenCache = { token: localStorage.getItem('TOKEN') };
    const response = yield call(API.tokenCheck, tokenCache);
    if (response.succes) {
      yield put(
        {
          type: 'USER_AUTHENTICATED',
          payload: response,
        });
    } else {
      localStorage.removeItem('TOKEN');
      yield put({
        type: 'USER_AUTH_FAILED',
      });
    }
  } catch (error) {
    localStorage.removeItem('TOKEN');
    yield put({
      type: 'USER_AUTH_FAILED',
    });
  }
}

function* updateKingdom(action) {
  const kingdomName = { name: action.payload };
  try {
    const response = yield call(API.putData, kingdomName, 'http://localhost:3000/kingdoms');
    yield put({
      type: 'KINGDOM_CHANGE_SUCCEEDED',
      payload: response,
    });
  } catch (error) {
    yield put({
      type: 'CHANGE_FAILED',
    });
    console.log(error); // eslint-disable-line
  }
}

const occupiedCountries = (countries) => {
  const kingdomNumber = Object.keys(countries.kingdoms).length;
  const tempArray = [];
  for (let i = 0; i < kingdomNumber; i += 1) {
    tempArray.push(countries.kingdoms[i].location);
  }
  const mergedTaken = tempArray.flat(1);
  return mergedTaken;
};

function* takenCountries() {
  try {
    const response = yield call(API.getData, 'http://localhost:3000/kingdom/map');
    yield put({
      type: 'TAKEN_COUNTRIES_RECIEVED',
      payload: {
        occupiedCountries: occupiedCountries(response),
        fullMap: response,
      },
    });
  } catch (error) {
    yield put({
      type: 'ERROR',
    });
    console.log(error); // eslint-disable-line
  }
}

function* kingdomSelect(action) {
  try {
    const response = yield call(API.sendMap, action.payload, 'http://localhost:3000/register/map');
    yield put({
      type: 'KINGDOM_ATTACHED',
      payload: response,
    });
  } catch (error) {
    yield put({
      type: 'ERROR',
    });
    console.log(error); // eslint-disable-line
  }
}

function* getInitBuildings() {
  try {
    const response = yield call(API.getData, 'http://localhost:3000/kingdom/buildings');
    yield put({
      type: 'INITIAL_BUILDINGS_UPDATED',
      payload: response,
    });
  } catch (error) {
    yield put({
      type: 'INITIAL_BUILDINGS_FAILED',
    });
    console.log(error); // eslint-disable-line
  }
}

function* sendBuilding(action) {
  try {
    const response = yield call(API.postData, action.payload, 'http://localhost:3000/kingdom/buildings');
    if (response.status === 'error') {
      yield put({
        type: 'GET_NEW_BUILDING_FAILED',
      });
    } else {
      yield put({
        type: 'GET_NEW_BUILDING',
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: 'GET_NEW_BUILDING_FAILED',
    });
    console.log(error); // eslint-disable-line
  }
}

function* upgradeBuildingRequest(action) {
  try {
    const response = yield call(API.putData, action.payload, `http://localhost:3000/kingdom/buildings/${action.payload.buildingId}`);
    if (response.status === 'error') {
      yield put({
        type: 'GET_NEW_BUILDING_FAILED',
      });
    } else {
      yield put({
        type: 'GET_NEW_BUILDING',
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: 'GET_NEW_BUILDING_FAILED',
    });
    console.log(error); // eslint-disable-line
  }
}

function* addTroopRequest() {
  try {
    const response = yield call(API.postData, {}, 'http://localhost:3000/kingdom/troops');
    if (response.type === 'userError' || response.type === 'databaseError') {
      yield put({
        type: 'GET_TROOP_FAILED',
      });
    } else {
      yield put({
        type: 'GET_NEW_TROOP',
        payload: response,
      });
    }
  } catch (error) {
    yield put({
      type: 'GET_TROOP_FAILED',
    });
    console.log(error); // eslint-disable-line
  }
}


const myCountries = (countries) => {
  const countriesNumber = Object.keys(countries).length;
  const tempArray = [];
  for (let i = 0; i < countriesNumber; i += 1) {
    tempArray.push(countries[i].countrycode);
  }
  const mergedTaken = tempArray.flat(1);
  return mergedTaken;
};

function* getMyCountry() {
  try {
    const response = yield call(API.getData, 'http://localhost:3000/kingdom');
    yield put({
      type: 'MY_COUNTRY_RECEIVED',
      payload: myCountries(response.locations),
    });
  } catch (error) {
    yield put({
      type: 'ERROR',
    });
    console.log(error); // eslint-disable-line
  }
}

function* getMyTroops() {
  try {
    const response = yield call(API.getData, 'http://localhost:3000/kingdom/troops');
    yield put({
      type: 'MY_TROOPS_RECIEVED',
      payload: response,
    });
  } catch (error) {
    yield put({
      type: 'TROOPS_ERROR',
    });
    console.log(error); // eslint-disable-line
  }
}

function* attackEnemyKingdom(action) {
  try {
    const response = yield call(API.postData, action.payload, 'http://localhost:3000/kingdom/attack');
    console.log(action.payload)
    console.log(response)
    yield put({
      type: 'ATTACK_ENEMY_RESULT',
      payload: response,
    });
  } catch (error) {
    yield put({
      type: 'ERROR',
    });
    console.log(error); // eslint-disable-line
  }
}


export default function* rootSaga() {
  yield takeEvery('USER_LOGIN_REQUESTED', login);
  yield takeEvery('USER_REGISTRATION_REQUESTED', register);
  yield takeEvery('INITIAL_RESOURCE_REQUESTED', getResource);
  yield takeEvery('USER_AUTH_REQUESTED', authenticate);
  yield takeEvery('KINGDOM_CHANGE_REQUESTED', updateKingdom);
  yield takeEvery('TAKEN_COUNTRIES_REQUESTED', takenCountries);
  yield takeEvery('KINGDOM_SELECT_REQUESTED', kingdomSelect);
  yield takeEvery('GET_INITIAL_BUILDINGS', getInitBuildings);
  yield takeEvery('SEND_NEW_BUILDING', sendBuilding);
  yield takeEvery('UPGRADE_BUILDING_REQUESTED', upgradeBuildingRequest);
  yield takeEvery('CREATE_TROOP_REQUEST', addTroopRequest);
  yield takeEvery('GET_MY_COUNTRIES', getMyCountry);
  yield takeEvery('GET_MY_TROOPS', getMyTroops);
  yield takeEvery('ATTACK_ENEMY_REQUEST', attackEnemyKingdom)
}
