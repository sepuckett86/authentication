// this file is not connected to main app yet

// POST api/auth/login, to do the login and get your access token;
// POST api/auth/refresh, to refresh an existent access token by getting a new one;
//  POST api/auth/signup, to create a new user into your application;
//  POST api/auth/recovery, to recover your credentials;
//  POST api/auth/reset, to reset your password after the recovery;
//  POST api/auth/logout, to log out the user by invalidating the passed token;
//  GET api/auth/me, to get current user data;

import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, RESPONSE, RESPONSE_ERROR, GET_GOODMINDERS,
  GET_PROMPTS, POST_GOODMINDER, GET_USER, DELETE_ACCOUNT,
  PUT_GOODMINDER, DELETE_GOODMINDER, GET_COLLECTIONS, GET_NICKNAME,
  POST_PROMPT, PUT_PROMPT, DELETE_PROMPT} from './types';
import { optionsWithToken, tokenInLocalStorage } from './functions';

const baseURL = 'http://goodminder.test/';

export const postSignout = () => async dispatch => {
  try {
    if (tokenInLocalStorage()) {
      const path = baseURL + 'api/auth/logout';
      const content = { 'token': localStorage.getItem('id_token') };
      const options = optionsWithToken();
      // Update back-end to show that user is logged out
      const response = await axios.post(path, content, options);
      console.log(response);
      // Update redux store to show that no user is logged in
      dispatch({ type: AUTH_USER, payload: '' });
      // Update local storage to remove token from browser
      localStorage.removeItem('id_token');
      sessionStorage.removeItem('myData');
    } else if (!tokenInLocalStorage()) {
      alert('You are already logged out')
      return 0;
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
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
    if (e.response.status === 403) {
      dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    } else {
      dispatch({ type: RESPONSE_ERROR, payload: e });
    }

  }
};

export const postSignup = (email, password, password_confirmation, callback) => async dispatch => {
  try {
    const path = baseURL + 'api/auth/signup';
    let options;
    if (tokenInLocalStorage()) {
      options = optionsWithToken
    }
    const content = {
        'name': 'User',
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
    const options = optionsWithToken();
    if (tokenInLocalStorage()) {
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
      dispatch({ type: RESPONSE_ERROR, payload: e.response});
    } else {
      dispatch({ type: RESPONSE, payload: 'Unknown error' });
    }
  }
};

export const getPrompts = (callback) => async dispatch => {
  try {
    const path = baseURL + 'api/prompts';
    const options = optionsWithToken();
    if (tokenInLocalStorage()) {
      const response = await axios.get(path, options);
      const user_prompts = response.data['user prompts'];
      const stored_prompts = response.data['stored prompts'];
      const all_prompts = user_prompts.concat(stored_prompts);
      dispatch({ type: GET_PROMPTS, payload: all_prompts });
      callback();
    } else {
      console.log('No token')
    }

  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e});
  }
};

export const postGoodminder = (gminder, callback) => async dispatch => {
  try {
    const path = baseURL + 'api/gminders';
    if (tokenInLocalStorage()) {
      const options = optionsWithToken();
      const content = gminder;
      const response = await axios.post(path, content, options);
      dispatch({ type: POST_GOODMINDER, payload: gminder });
      callback();
    }  else {
      console.log('No token')
      dispatch({ type: RESPONSE, payload: e.response});
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e});
  }
};

export const getUser = () => async dispatch => {
  try {
    const path = baseURL + 'api/auth/me';
    if (localStorage.getItem('id_token')) {
      const options = optionsWithToken();
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
    const options = optionsWithToken();
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
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}

export const deleteGoodminder = (id, goodminders, callback) => async dispatch => {
  try {
    const path = baseURL + `/api/gminders/${id}`;
    if (tokenInLocalStorage()) {
      const options = optionsWithToken();
      // DELETE request with gminder id
      const response = await axios.delete(path, options);
      // Remove old goodminder from goodminders array
      const filtered = goodminders.filter(goodminder => goodminder.id !== id);
      dispatch({ type: DELETE_GOODMINDER, payload: goodminders });
      callback()
    } else {
      console.log('token absent')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}

// Adds a collection to stored_prompts table
export const postCollection = (collection, creator_id, callback) => async dispatch => {
  try {
    const path = baseURL + '/api/promptStorage';
    if (tokenInLocalStorage()) {
      const options = optionsWithToken();
      const content = {
        'promptCollection': collection,
        'creator_id': creator_id
      };
      const response = await axios.post(path, content, options);
      const payload = { collection: collection, creator_id: creator_id }
      dispatch({ type: POST_COLLECTION, payload: payload });
      callback()
    } else {
      console.log('token absent')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}

export const getCollections = (callback) => async dispatch => {
  try {
    const path = baseURL + 'api/promptStorage';
    const options = optionsWithToken();
    if (tokenInLocalStorage()) {
      const response = await axios.get(path, options);
      dispatch({ type: GET_COLLECTIONS, payload: response.data });
      callback();
    } else {
      console.log('No token')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e});
  }
};

// Get a user's nickname based on id
export const getNickname = (id, callback) => async dispatch => {
  try {
    const path = baseURL + `api/users/${id}`;
    const options = optionsWithToken();
    if (tokenInLocalStorage()) {
      const response = await axios.get(path, options);
      const nickname = response.data[0].nickname;
      dispatch({ type: GET_NICKNAME, payload: nickname });
      callback();
    } else {
      console.log('No token')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e});
  }
};


export const postPrompt = (prompt, callback) => async dispatch => {
  try {
    const path = baseURL + `api/prompts`;
    const options = optionsWithToken();
    const content = prompt;
    if (tokenInLocalStorage()) {
      const response = await axios.post(path, content, options);
      dispatch({ type: POST_PROMPT, payload: prompt });
      callback();
    } else {
      console.log('No token')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e});
  }
};

export const putPrompt = (updatedPrompt, callback) => async dispatch => {
  try {
    const id = updatedPrompt.id;
    const path = baseURL + `/api/prompts/${id}`;
    const options = optionsWithToken();
    const content = updatedPrompt;
    const response = await axios.put(path, content, options);
    dispatch({ type: PUT_PROMPT, payload: updatedPrompt });
    callback();
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}

export const deletePrompt = (id, callback) => async dispatch => {
  try {
    const path = baseURL + `/api/prompts/${id}`;
    if (tokenInLocalStorage()) {
      const options = optionsWithToken();
      // DELETE request with gminder id
      const response = await axios.delete(path, options);
      dispatch({ type: DELETE_PROMPT, payload: response });
      callback()
    } else {
      console.log('token absent')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}
