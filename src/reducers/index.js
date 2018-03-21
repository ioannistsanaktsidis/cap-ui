import { combineReducers } from 'redux';
// import fuelSavings from './fuelSavingsReducer';
import search from './searchReducer';
import auth from './authReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  // fuelSavings,
  auth,
  search,
  routing: routerReducer
});

export default rootReducer;
