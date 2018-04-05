export const TOGGLE_FILEMANAGER_LAYER = 'TOGGLE_FILEMANAGER_LAYER';
export const TOGGLE_PREVIEWER = 'TOGGLE_PREVIEWER';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const TOGGLE_LIVE_VALIDATE = 'TOGGLE_LIVE_VALIDATE';
export const TOGGLE_CUSTOM_VALIDATION = 'TOGGLE_CUSTOM_VALIDATION';
export const TOGGLE_VALIDATE = 'TOGGLE_VALIDATE';

export const CHANGE_SCHEMA = 'CHANGE_SCHEMA';
export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA';

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

export function startDeposit(schema, initialData=null) {
  return function (dispatch) {
    if (initialData) dispatch(updateFormData(initialData));
    else dispatch(updateFormData({}));

    dispatch(changeSchema(schema));
  };
}