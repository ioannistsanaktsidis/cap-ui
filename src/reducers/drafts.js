import { Map } from 'immutable';

import {
  TOGGLE_FILEMANAGER_LAYER,
  TOGGLE_PREVIEWER,
  TOGGLE_LIVE_VALIDATE,
  TOGGLE_CUSTOM_VALIDATION,
  TOGGLE_VALIDATE,
  TOGGLE_SIDEBAR,
  CHANGE_SCHEMA,
  UPDATE_FORM_DATA,
  DRAFTS_ITEM_REQUEST,
  DRAFTS_ITEM_SUCCESS,
  DRAFTS_ITEM_ERROR,
} from '../actions/drafts';

const initialState = Map({
  schema: null,
  uiSchema: Map(),
  data: {},
  selectedSchema: null,
  fileManagerActiveLayer: false,
  showPreviewer: true,
  showSidebar: true,
  liveValidate: true,
  validate: true,
  customValidation: false,
  current_item: Map({
    id: null,
    data: null,
    loading: false,
    error: null
  })
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
    case TOGGLE_LIVE_VALIDATE:
      return state.set('liveValidate', !state.get('liveValidate'));
    case TOGGLE_CUSTOM_VALIDATION:
      return state.set('customValidation', !state.get('customValidation'));
    case TOGGLE_VALIDATE:
      return state.set('validate', !state.get('validate'));
    case CHANGE_SCHEMA:
      return state
              .set('selectedSchema', action.schema.selectedSchema )
              .set('schema', action.schema.schema )
              .set('uiSchema', action.schema.uiSchema );
    case UPDATE_FORM_DATA:
      return state.set('data', action.data);
    case DRAFTS_ITEM_REQUEST:
      return state
              .setIn(['current_item', 'loading'], true)
              .setIn(['current_item', 'error'], null);
    case DRAFTS_ITEM_SUCCESS:
      return state
              .setIn(['current_item', 'loading'], false)
              .setIn(['current_item', 'data'], action.draft);
    case DRAFTS_ITEM_ERROR:
      return state
              .setIn(['current_item', 'loading'], false)
              .setIn(['current_item', 'error'], action.error);
    default:
      return state;
  }
}
