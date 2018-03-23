import {Map, fromJS} from 'immutable';

import {
  TOGGLE_FILEMANAGER_LAYER,
  TOGGLE_PREVIEWER,
  TOGGLE_SIDEBAR
} from '../actions/deposit';

const initialState = Map({
  fileManagerActiveLayer: false,
  showPreviewer: true,
  showSidebar: true
});
// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function depositReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FILEMANAGER_LAYER:
      return state.set('fileManagerActiveLayer', !state.get('fileManagerActiveLayer'));
    case TOGGLE_PREVIEWER:
      return state.set('showPreviewer', !state.get('showPreviewer'));
    case TOGGLE_SIDEBAR:
      return state.set('showSidebar', !state.get('showSidebar'));
    default:
      return state;
  }
}
