import axios from 'axios';

export const TOGGLE_FILEMANAGER_LAYER = 'TOGGLE_FILEMANAGER_LAYER';
export const TOGGLE_PREVIEWER = 'TOGGLE_PREVIEWER';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const TOGGLE_LIVE_VALIDATE = 'TOGGLE_LIVE_VALIDATE';
export const TOGGLE_CUSTOM_VALIDATION = 'TOGGLE_CUSTOM_VALIDATION';
export const TOGGLE_VALIDATE = 'TOGGLE_VALIDATE';

export const FETCH_SCHEMA_BEGIN = 'FETCH_SCHEMA_BEGIN';
export const FETCH_SCHEMA_SUCCESS = 'FETCH_SCHEMA_SUCCESS';
export const FETCH_SCHEMA_ERROR = 'FETCH_SCHEMA_ERROR';
export const SELECT_SCHEMA = 'SELECT_SCHEMA';
export const CHANGE_SCHEMA = 'CHANGE_SCHEMA';
export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA';

export const DRAFTS_REQUEST = 'DRAFTS_REQUEST';
export const DRAFTS_SUCCESS = 'DRAFTS_SUCCESS';
export const DRAFTS_ERROR = 'DRAFTS_ERROR';

export const DRAFTS_ITEM_REQUEST = 'DRAFTS_ITEM_REQUEST';
export const DRAFTS_ITEM_SUCCESS = 'DRAFTS_ITEM_SUCCESS';
export const DRAFTS_ITEM_ERROR = 'DRAFTS_ITEM_ERROR';

export function draftsRequest(){
  return {
    type: DRAFTS_REQUEST
  };
}

export function draftsSuccess(drafts) {
  return {
    type: DRAFTS_SUCCESS,
    drafts
  };
}

export function draftsError(error) {
  return {
    type: DRAFTS_ERROR,
    error
  };
}

export function draftsItemRequest(){
  return {
    type: DRAFTS_ITEM_REQUEST
  };
}

export function draftsItemSuccess(draft) {
  return {
    type: DRAFTS_ITEM_SUCCESS,
    draft
  };
}

export function draftsItemError(error) {
  return {
    type: DRAFTS_ITEM_ERROR,
    error
  };
}

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

export function toggleLiveValidate() {
  return {
    type: TOGGLE_LIVE_VALIDATE
  };
}

export function toggleCustomValidation() {
  return {
    type: TOGGLE_CUSTOM_VALIDATION
  };
}

export function toggleValidate() {
  return {
    type: TOGGLE_VALIDATE
  };
}

export const fetchSchemaBegin = () => ({
  type: FETCH_SCHEMA_BEGIN
});

export const fetchSchemaSuccess = payload => ({
  type: FETCH_SCHEMA_SUCCESS,
  payload
});

export const fetchSchemaError = error => ({
  type: FETCH_SCHEMA_ERROR,
  error
});

export function selectSchema(schemaToFetch) {
  return {
    type: SELECT_SCHEMA,
    schema: schemaToFetch
  }
}

export function changeSchema(newSchema) {
  return {
    type: CHANGE_SCHEMA,
    schema: newSchema
  };
}

export function updateFormData(data) {
  return {
    type: UPDATE_FORM_DATA,
    schema: data
  };
}

export function fetchSchema(schema) {
  return dispatch => {
    dispatch(fetchSchemaBegin());
      return getSchema(schema)
        .then(([response, json]) =>{
          if(response.status === 200){
            dispatch(fetchSchemaSuccess({json}))
          }
          else{
            dispatch(fetchSchemaError())
          }
    })

  };
}

function getSchema(schema) {
  const URL = "/api/schemas/deposits/records/" + schema + "-v0.0.1.json";
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}

export function startDeposit(schema, initialData=null) {
  return function (dispatch) {
    if (initialData) dispatch(updateFormData(initialData));
    else dispatch(updateFormData({}));

    dispatch(changeSchema(schema));
  };
}


export function getDraftsItem(id) {
  return function (dispatch) {
    dispatch(draftsItemRequest());

    let uri = `/api/deposits/${id}`;
    axios.get(uri)
      .then(function (response) {
        dispatch(draftsItemSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(draftsItemError(error.response.data));
      });
  };
}