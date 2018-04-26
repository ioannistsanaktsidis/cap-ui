import { combineReducers } from 'redux';
// import fuelSavings from './fuelSavingsReducer';
import search from './searchReducer';
import auth from './authReducer';
import drafts from './drafts';
import published from './published';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  // fuelSavings,
  auth,
  drafts,
  search,
  published,
  routing: routerReducer
});

export default rootReducer;
