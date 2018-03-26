import axios from 'axios';
// import queryString from 'query-string';
import { push } from 'react-router-redux';

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

export function login({...rest}, history) {
  return function (dispatch) {
    dispatch(loginRequest());

    // console.log("LOGIN_SUCCESS go", rest, history)
    setTimeout(() => {
      // Saving JWT to localStorage
      let token = '12345';
      localStorage.setItem('token', token);
      dispatch(loginSuccess({
        userId: 7777777,
        token: token,
        profile: {
          name: "John",
          lastname: "Doe",
          email: "john.doe@cern.ch"
        }
      }))
    }, 1500);
  };
}


export function logout() {
  return function (dispatch) {
    dispatch(logoutRequest());

    localStorage.clear();
    dispatch(logoutSuccess());
  };
}
