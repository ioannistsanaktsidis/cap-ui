import axios from 'axios';

import config from '../config';

const API_URI = config.project.api;

export const RECORDS_REQUEST = 'RECORDS_REQUEST';
export const RECORDS_SUCCESS = 'RECORDS_SUCCESS';
export const RECORDS_ERROR = 'RECORDS_ERROR';


export function recordsRequest(){
  return {
    type: RECORDS_REQUEST
  };
}

export function recordsSuccess(records) {
  return {
    type: RECORDS_SUCCESS,
    records
  };
}

export function recordsError(error) {
  return {
    type: RECORDS_ERROR,
    error
  };
}


export function getRecords() {
  return function (dispatch) {
    dispatch(recordsRequest());

    let uri = API_URI+'/records';
    axios.get(uri)
      .then(function (response) {
        console.log(response);
        dispatch(recordsSuccess(response.data));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(recordsError(error));
      });
  };
}
