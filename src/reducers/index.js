import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import search from './searchReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  search,
  routing: routerReducer
});

export default rootReducer;
