import axios from 'axios';
// import queryString from 'query-string';
import { push } from 'react-router-redux';

export const TOGGLE_FILEMANAGER_LAYER = 'TOGGLE_FILEMANAGER_LAYER';
export const TOGGLE_PREVIEWER = 'TOGGLE_PREVIEWER';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export function toggleFilemanagerLayer() {
  return {
    type: TOGGLE_FILEMANAGER_LAYER
  };
}

export function togglePreviewer() {
  return {
    type: TOGGLE_PREVIEWER
  };
}

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR
  };
}


// export function logout() {
//   return function (dispatch) {
//     dispatch(logoutRequest());

//     localStorage.clear();
//     dispatch(logoutSuccess());
//   };
// }
