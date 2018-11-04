// this file is not connected to main app yet

// POST api/auth/login, to do the login and get your access token;
// POST api/auth/refresh, to refresh an existent access token by getting a new one;
//  POST api/auth/signup, to create a new user into your application;
//  POST api/auth/recovery, to recover your credentials;
//  POST api/auth/reset, to reset your password after the recovery;
//  POST api/auth/logout, to log out the user by invalidating the passed token;
//  GET api/auth/me, to get current user data;

import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, RESPONSE, GET_GOODMINDERS,
  GET_PROMPTS, POST_GOODMINDER, GET_USER, DELETE_ACCOUNT,
  PUT_GOODMINDER, DELETE_GOODMINDER } from './types';
import * as functions from './functions.js';

const baseURL = 'http://goodminder.test/';

export const postSignout = () => async dispatch => {
  try {
    const path = baseURL + 'api/auth/logout';
    let options;
    let token = localStorage.getItem('id_token');
    options = {
      'headers': {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    let response;
    const content = { 'token': token }
    if (token) {
      // Update back-end to show that user is logged out
      response = await axios.post(path, content, options);
      console.log(response);
      // Update redux store to show that no user is logged in
      dispatch({ type: AUTH_USER, payload: '' });
      // Update local storage to remove token from browser
      localStorage.removeItem('id_token');
      sessionStorage.removeItem('myData');
    }
    if (content.token === undefined) {
      alert('You are already logged out')
      return 0;
    }


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
    localStorage.setItem('id_token', response.data.token);
    sessionStorage.setItem('myData', 'logged in');
    callback();
  } catch (e) {
    console.log(e);
    console.log(e.response);
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
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
    if (e.response) {
      dispatch({ type: RESPONSE, payload: e.response});
    } else {
      dispatch({ type: RESPONSE, payload: 'Unknown error' });
    }
  }
};

export const getPrompts = (callback) => async dispatch => {
  try {
    const path = baseURL + 'api/prompts';
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
      // dispatch({ type: GET_PROMPTS, payload: response.data });
      dispatch({ type: GET_PROMPTS, payload: [{
        id: 1,
        collection: 'Favorites',
        promptText: 'What is a song that made you smile in the past month?'
      }]});
      callback();
    } else {
      console.log('No token')
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
    if (localStorage.getItem('id_token')) {
      const options = functions.makeOptionsWithToken();
      const response = await axios.get(path, options);
      dispatch({ type: GET_USER, payload: response.data });
    } else {
      console.log('Load general page: User login token absent')
    }
  } catch (e) {
    // Update local storage to remove token from browser
    localStorage.removeItem('id_token');
    dispatch({ type: AUTH_USER, payload: false});
    // Internal server error
    if (e.response) {
      dispatch({ type: RESPONSE, payload: e.response});
    } else {
      dispatch({ type: RESPONSE, payload: 'getUser failed' });
    }
  }
};

export const deleteUser = () => async dispatch => {
  try {
    console.log('Not enabled yet')
  } catch (e) {
    dispatch({ type: RESPONSE, payload: e });
  }
}

export const putGoodminder = (updatedGoodminder, goodminders, callback) => async dispatch => {
  try {
    const id = updatedGoodminder.id;
    const path = baseURL + `/api/gminders/${id}`;
    const options = functions.makeOptionsWithToken();
    const content = updatedGoodminder;
    // PUT request with updatedGminder
    const response = await axios.put(path, content, options);
    // Remove old goodminder from goodminders array
    const filtered = goodminders.filter(goodminder => goodminder.id !== id);
    // Add updatedGoodminder to array
    filtered.push(updatedGoodminder);
    // Assign updated array to payload
    dispatch({ type: PUT_GOODMINDER, payload: filtered });
    callback();
  } catch (e) {
    dispatch({ type: RESPONSE, payload: e });
  }
}

export const deleteGoodminder = (id, goodminders, callback) => async dispatch => {
  try {
    // DELETE request with gminder id
    console.log('Not enabled yet')
    dispatch({ type: DELETE_GOODMINDER, payload: goodminders });
    callback()
  } catch (e) {
    dispatch({ type: RESPONSE, payload: e });
  }
}
