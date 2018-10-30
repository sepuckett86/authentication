// NOTE: this is the file that must be altered to work with back end
// Current form is functional but does not make calls to api
// See API_Request_backend.js

import axios from 'axios';
import { GET_GOODMINDER, POST_GOODMINDER, PUT_GOODMINDER,
  DELETE_GOODMINDER, GET_GOODMINDERS } from './types';
import { AUTH_USER, AUTH_ERROR, RESPONSE } from './types';


const baseURL = '';

export function getGoodminder(id) {
  axios.get(baseURL + `api/gminders/${id}`)
  return {
    type: GET_GOODMINDER,
    payload: 'response'
  }
}

export function postGoodminder(goodminder) {
  return {
    type: POST_GOODMINDER,
    payload: goodminder
  }
}

export function putGoodminder(id) {
  return {
    type: PUT_GOODMINDER,
    payload: id
  }
}

export function deleteGoodminder(id) {
  return {
    type: DELETE_GOODMINDER,
    payload: id
  }
}

export function getGoodminders() {
  return {
    type: GET_GOODMINDERS,
    payload: 'response'
  }
}

export const postSignup = ( email, password ) => {
  let action = {};

  if ( email && password ) {
    action = { type: AUTH_USER, payload: '' };

  } else {
    action = { type: AUTH_ERROR, payload: 'Email in use' };
  }
  return action
}

export const postLogin = (email, password) =>  {
  let action = {};

  if ( email && password ) {
    action = { type: AUTH_USER, payload: 'MyToken' };
    localStorage.setItem('token', 'MyToken');
  } else {
    action = { type: AUTH_ERROR, payload: 'Email in use' };
  }
  return action
};

// Normal, synchronous action creator
export const postSignout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  }
}

export const postReset = (email) => {
  return {
    type: RESPONSE,
    payload: 'password reset success for ' + email
  }
}
