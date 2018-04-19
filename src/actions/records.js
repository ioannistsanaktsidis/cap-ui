import axios from 'axios';

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

    let uri = '/api/records';
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
