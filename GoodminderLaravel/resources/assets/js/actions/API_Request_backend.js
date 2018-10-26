// this file is not connected to main app yet

// POST api/auth/login, to do the login and get your access token;
// POST api/auth/refresh, to refresh an existent access token by getting a new one;
//  POST api/auth/signup, to create a new user into your application;
//  POST api/auth/recovery, to recover your credentials;
//  POST api/auth/reset, to reset your password after the recovery;
//  POST api/auth/logout, to log out the user by invalidating the passed token;
//  GET api/auth/me, to get current user data;

import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

const baseURL = 'http://localhost:3090/'
// Because of redux-thunk, can return a function
// instead of an object with type property
// This way, can dispatch multiple actions
// with a single action creator
export const postSignup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(baseURL + 'api/auth/signup', formProps);

    dispatch({ type: AUTH_USER, payload: 'signupRequested' });
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const postSignout = () => async dispatch => {
  try {
    const response = await axios.post(baseURL + 'api/auth/logout');
    dispatch({ type: AUTH_USER, payload: '' });
    localStorage.removeItem('token');
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Error during logout' });
  }
}

export const postLogin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(baseURL + 'api/auth/login', formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};
