// this file is not connected to main app yet

// POST api/auth/login, to do the login and get your access token;
// POST api/auth/refresh, to refresh an existent access token by getting a new one;
//  POST api/auth/signup, to create a new user into your application;
//  POST api/auth/recovery, to recover your credentials;
//  POST api/auth/reset, to reset your password after the recovery;
//  POST api/auth/logout, to log out the user by invalidating the passed token;
//  GET api/auth/me, to get current user data;

import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, RESPONSE, GET_GOODMINDERS, POST_GOODMINDER, GET_USER } from './types';

const baseURL = 'http://goodminder.test/';

export const postSignout = () => async dispatch => {
  try {
    const path = baseURL + 'api/auth/logout';
    let options;
    let token = localStorage.getItem('id_token');
    if (token) {
      options = {
        'headers': {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    }
    const content = { 'token': token }
    if (content.token === undefined) {
      alert('You are already logged out')
      return 0;
    }
    // Update back-end to show that user is logged out
    const response = await axios.post(path, content, options);
    console.log(response);
    // Update redux store to show that no user is logged in
    dispatch({ type: AUTH_USER, payload: '' });
    // Update local storage to remove token from browser
    localStorage.removeItem('id_token');
  } catch (e) {
    console.log(e);
    dispatch({ type: AUTH_ERROR, payload: 'Error during logout' });
  }
}

export const postLogin = (email, password, callback) => async dispatch => {
  try {
    const path = baseURL + 'api/auth/login';
    const content = {
      email: email,
      password: password
    };
    const response = await axios.post(path, content);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('id_token', response.data.token)
    callback();
  } catch (e) {
    console.log(e);
    if (e.response) {
      console.log(e.response)
      dispatch({ type: AUTH_ERROR, payload: e.response });
    } else {
      dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
  }
};

export const postSignup = (email, password, password_confirmation, callback) => async dispatch => {
  try {
    const path = baseURL + 'api/auth/signup';
    let options;
    let token = localStorage.getItem('id_token');
    if (token) {
      options = {
        'headers': {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    }
    const content = {
        'name': 'no_data',
        email,
        password,
        password_confirmation
      }
    const response = await axios.post(path, content);

    dispatch({ type: RESPONSE, payload: response });
    callback();
  } catch (e) {
    // Internal server error
    if (e.response.status === 500) {
      const payload = {'component':'SignUp', 'status': 500, 'message': 'Email in use'};
      console.log(payload)
      dispatch({ type: RESPONSE, payload: payload});
    } else {
      dispatch({ type: RESPONSE, payload: 'Unknown error' });
    }
  }
};

export const getGoodminders = (callback) => async dispatch => {
  try {
    const path = baseURL + 'api/gminders';
    const token = localStorage.getItem('id_token');
    const options = {
      'headers': {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    if (token) {
      const response = await axios.get(path, options);
      dispatch({ type: GET_GOODMINDERS, payload: response.data });
      callback();
    } else {
      console.log('No token')
    }

  } catch (e) {
    console.log(e)
    // Internal server error
    if (e.response.status === 500) {
      dispatch({ type: RESPONSE, payload: e.response});
    } else {
      dispatch({ type: RESPONSE, payload: 'Unknown error' });
    }
  }
};

export const postGoodminder = (gminder, callback) => async dispatch => {
  try {
    const path = baseURL + 'api/gminders';
    let options;
    let token = localStorage.getItem('id_token');
    if (token) {
      options = {
        'headers': {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    }
    const content = gminder;
    const response = await axios.post(path, content, options);
    dispatch({ type: POST_GOODMINDER, payload: gminder });
    callback();
  } catch (e) {
    console.log(e)
    // Internal server error
    if (e.response) {
      dispatch({ type: RESPONSE, payload: e.response});
    } else {
      dispatch({ type: RESPONSE, payload: 'Unknown error' });
    }
  }
};

export const getUser = () => async dispatch => {
  try {
    const path = baseURL + 'api/auth/me';
    let token = localStorage.getItem('id_token');
    let options;
    if (token) {
      options = {
        'headers': {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
      const response = await axios.get(path, options);
      dispatch({ type: GET_USER, payload: response.data });
    } else {
      console.log('no token for request')
    }
  } catch (e) {
    console.log(e)
    // Internal server error
    if (e.response) {
      dispatch({ type: RESPONSE, payload: e.response});
    } else {
      dispatch({ type: RESPONSE, payload: 'Unknown error' });
    }
  }
};
