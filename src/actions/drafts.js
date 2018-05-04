import axios from 'axios';

export const TOGGLE_FILEMANAGER_LAYER = 'TOGGLE_FILEMANAGER_LAYER';
export const TOGGLE_PREVIEWER = 'TOGGLE_PREVIEWER';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const TOGGLE_LIVE_VALIDATE = 'TOGGLE_LIVE_VALIDATE';
export const TOGGLE_CUSTOM_VALIDATION = 'TOGGLE_CUSTOM_VALIDATION';
export const TOGGLE_VALIDATE = 'TOGGLE_VALIDATE';

export const FETCH_SCHEMA_REQUEST = 'FETCH_SCHEMA_REQUEST';
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



export const CREATE_DRAFT_REQUEST = 'CREATE_DRAFT_REQUEST';
export const CREATE_DRAFT_SUCCESS = 'CREATE_DRAFT_SUCCESS';
export const CREATE_DRAFT_ERROR = 'CREATE_DRAFT_ERROR';

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

export function fetchSchemaRequest() {
  return {
    type: FETCH_SCHEMA_REQUEST
  }
};

export function fetchSchemaSuccess (schema) {
  return {
    type: FETCH_SCHEMA_SUCCESS,
    schema
  }
};

export function fetchSchemaError(error) {
  type: FETCH_SCHEMA_ERROR,
  error
};

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

export function createDraftRequest() {
  return {
    type: CREATE_DRAFT_REQUEST
  }
}

export function createDraftSuccess(draft) {
  return {
    type: CREATE_DRAFT_SUCCESS,
    draft
  }
}

export function createDraftError(error) {
  return {
    type: CREATE_DRAFT_ERROR,
    error
  }
}

export function fetchSchema(schema) {
  return dispatch => {
    const URL = "/api/schemas/deposits/records/" + schema + "-v0.0.1.json";
    dispatch(fetchSchemaRequest());
    axios.get(URL)
      .then((response) => dispatch(fetchSchemaSuccess(response.data)) )
      .catch((error) => dispatch(fetchSchemaError()) )
  };
}

export function startDeposit(schema, initialData=null) {
  return function (dispatch) {
    if (initialData) dispatch(updateFormData(initialData));
    else dispatch(updateFormData({}));

    dispatch(changeSchema(schema));
  };
}

export function createDraft(data, schema) {
  return dispatch => {
    dispatch(createDraftRequest());
    data['$schema'] = `https://analysispreservation.cern.ch/schemas/deposits/records/${schema}-v0.0.1.json`;
    
    let uri = '/api/deposits/';
    axios.post(uri, data)
      .then(function(response){
        dispatch(createDraftSuccess(response.data))
      })
      .catch(function(error) {
        dispatch(createDraftError(error.response.data));
      })
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