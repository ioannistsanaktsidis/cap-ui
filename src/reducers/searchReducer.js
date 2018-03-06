import {fromJS} from 'immutable';

import {
  QUERY_CHANGED,
  ADD_AGGS,
  REMOVE_AGGS,
  CLEAR_SEARCH,
  PAGE_CHANGE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR
} from '../actions/search';

import {necessaryDataIsProvidedToCalculateSavings, calculateSavings} from '../utils/fuelSavings';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function searchReducer(state = initialState.search, action) {
  let newState;

  switch (action.type) {
    case QUERY_CHANGED:
      return state.set('query', action.query)
    case ADD_AGGS:
      return state
              .set('selectedAggs', fromJS(action.selectedAggs))
    case REMOVE_AGGS:
      return state
    case CLEAR_SEARCH:
      return state
    case PAGE_CHANGE:
      return state
    case SEARCH_REQUEST:
      return state.set('loading', true);
    case SEARCH_SUCCESS:
      return state
              .set('results', fromJS(action.results))
              .set('loading', false);
              // .set('aggs', fromJS(action.results.aggregations))
    case SEARCH_ERROR:
      return state
    // case SAVE_FUEL_SAVINGS:
    //   // For this example, just simulating a save by changing date modified.
    //   // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
    //   return objectAssign({}, state, {dateModified: action.dateModified});

    // case CALCULATE_FUEL_SAVINGS:
    //   newState = objectAssign({}, state);
    //   newState[action.fieldName] = action.value;
    //   newState.necessaryDataIsProvidedToCalculateSavings = necessaryDataIsProvidedToCalculateSavings(newState);
    //   newState.dateModified = action.dateModified;

    //   if (newState.necessaryDataIsProvidedToCalculateSavings) {
    //     newState.savings = calculateSavings(newState);
    //   }

    //   return newState;

    default:
      return state;
  }
}
