import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import resource from './resource';
import user from './user';
import kingdom from './kingdom';
import building from './building';

const rootReducer = combineReducers({
  user,
  resource,
  kingdom,
  building,
  routing: routerReducer,
});

export default rootReducer;
