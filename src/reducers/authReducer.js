import {Map, fromJS} from 'immutable';

import {
AUTHENTICATED,
UNAUTHENTICATED,
LOGIN_REQUEST,
LOGIN_SUCCESS,
LOGOUT_REQUEST,
LOGOUT_SUCCESS,
LOGIN_ERROR
} from '../actions/auth';

const initialState = Map({
  isLoggedIn: false,
  currenUser: Map({}),
  token: localStorage.getItem('token'),
  error: null,
  loading: false
});
// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return state.set('isLoggedIn', true);
    case UNAUTHENTICATED:
      return state.set('isLoggedIn', false);
    case LOGIN_REQUEST:
      return state.set('loading', true);
    case LOGIN_SUCCESS:
      return state
              .set('isLoggedIn', true)
              .set('currentUser', fromJS(action.user))
              .set('loading', false);
    case LOGOUT_REQUEST:
      return state.set('loading', true);
    case LOGOUT_SUCCESS:
      return state
              .set('isLoggedIn', false)
              .set('currentUser', null)
              .set('loading', false);
              // .set('aggs', fromJS(action.results.aggregations))
    case LOGIN_ERROR:
      return state;

    default:
      return state;
  }
}
