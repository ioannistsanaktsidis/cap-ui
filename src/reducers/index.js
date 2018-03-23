import { combineReducers } from 'redux';
// import fuelSavings from './fuelSavingsReducer';
import search from './searchReducer';
import auth from './authReducer';
import deposit from './depositReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  // fuelSavings,
  auth,
  deposit,
  search,
  routing: routerReducer
});

export default rootReducer;
