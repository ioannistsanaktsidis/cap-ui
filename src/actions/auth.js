import axios from 'axios';

import config from '../config';

export const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function loginRequest(){
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}

export function logoutRequest(){
  return {
    type: LOGOUT_REQUEST
  };
}

export function logoutSuccess(){
  return {
    type: LOGOUT_SUCCESS
  };
}

export function authenticated() {
  return {
    type: AUTHENTICATED
  };
}

export function unauthenticated() {
  return {
    type: UNAUTHENTICATED
  };
}


export function loginLocalUser() {
  return function (dispatch) {
    dispatch(loginRequest());

    let uri = '/api/login_app';

    // axios.post(uri, {})
    //   .then(function (response) {
    //     console.log("loginResp::", response)
    //     let token = '12345';

    //     console.log(response);
    //     localStorage.setItem('token', token);

    //     dispatch(loginSuccess({
    //       userId: response.data,
    //       token: token,
    //       profile: {
    //         name: "John",
    //         lastname: "Doe",
    //         email: "john.doe@cern.ch"
    //       }
    //     }));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     dispatch(loginError(error));
    //   });
  };
}

export function initCurrentUser() {
  return function (dispatch) {

    axios.get('/api/me')
      .then(function (response) {
        let {id} = response.data;
        console.log(response.data);

        localStorage.setItem('token', id);
        dispatch(loginSuccess({
          userId: id,
          token: id,
          profile: response.data
        }));

      })
      .catch(function (error) {
        // console.log(error);
        dispatch(clearAuth());
      });
  }
}

export function loginWithCERN() {
  return function (dispatch) {
    dispatch(loginRequest());

    let uri = '/api/login_app';

    // axios.post(uri, {})
    //   .then(function (response) {
    //     console.log("loginResp::", response)
    //     let token = '12345';

    //     console.log(response);
    //     localStorage.setItem('token', token);

    //     dispatch(loginSuccess({
    //       userId: response.data,
    //       token: token,
    //       profile: {
    //         name: "John",
    //         lastname: "Doe",
    //         email: "john.doe@cern.ch"
    //       }
    //     }));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     dispatch(loginError(error));
    //   });
  };
}

export function clearAuth() {
  return function (dispatch) {
    dispatch(logoutRequest());
    localStorage.clear();
    dispatch(logoutSuccess());
  };
}

export function logout() {
  return function (dispatch) {
    dispatch(logoutRequest());

    axios.get('/api/logout/')
      .then(function (response) {
        localStorage.clear();
        dispatch(logoutSuccess());
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

