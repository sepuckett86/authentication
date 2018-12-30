// this file is not connected to main app yet

// POST api/auth/login, to do the login and get your access token;
// POST api/auth/refresh, to refresh an existent access token by getting a new one;
//  POST api/auth/signup, to create a new user into your application;
//  POST api/auth/recovery, to recover your credentials;
//  POST api/auth/reset, to reset your password after the recovery;
//  POST api/auth/logout, to log out the user by invalidating the passed token;
//  GET api/auth/me, to get current user data;

import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, RESPONSE, RESPONSE_ERROR,
  GET_USER, DELETE_ACCOUNT, GET_NICKNAME, PUT_USER, POST_RESET, POST_PASSWORD } from './types';
import { GET_GOODMINDERS, POST_GOODMINDER, PUT_GOODMINDER,
  DELETE_GOODMINDER } from './types';
import { GET_PROMPTS, POST_PROMPT, PUT_PROMPT, DELETE_PROMPT} from './types';
import { GET_PROMPT_COLLECTIONS, GET_PROMPT_COLLECTION, POST_PROMPT_COLLECTION,
  PUT_PROMPT_COLLECTION, POST_PROMPT_PROMPT_COLLECTION, DELETE_PROMPTS_FROM_COLLECTION,
  DELETE_PROMPT_COLLECTION, SET_PROMPT_COLLECTION_ID } from './types';
import { GET_STORED_COLLECTIONS, POST_STORED_COLLECTION, PUT_STORED_COLLECTION,
  DELETE_STORED_COLLECTION } from './types';
import { optionsWithToken, tokenInLocalStorage } from './functions';

const baseURL = 'http://goodminder.test/';

// AUTH

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

export const postSignup = (email, nickname, password, password_confirmation, callback) => async dispatch => {
  try {
    const path = baseURL + 'api/auth/signup';
    let options;
    if (tokenInLocalStorage()) {
      options = optionsWithToken
    }
    const content = {
        'name': 'User',
        nickname,
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

export const postReset = (token, email, password, password_confirmation, callback) => async dispatch => {
  try {
    if (tokenInLocalStorage()) {
      const path = baseURL + 'api/auth/reset';
      const content = {
        token,
        email,
        password,
        password_confirmation
      };
      const options = optionsWithToken();
      // Update back-end to show that user is logged out
      const response = await axios.post(path, content, options);
      dispatch({ type: POST_RESET, payload: response });
      dispatch({ type: AUTH_USER, payload: '' });
      // Update local storage to remove token from browser
      localStorage.removeItem('id_token');
      sessionStorage.removeItem('myData');
      callback();
    } else if (!tokenInLocalStorage()) {
      alert('You need to be logged in')
      return 0;
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}



// GOODMINDERS

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

export const putGoodminder = (updatedGoodminder, goodminders, callback) => async dispatch => {
  try {
    const id = updatedGoodminder.id;
    const path = baseURL + `api/gminders/${id}`;
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
    const path = baseURL + `api/gminders/${id}`;
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

// PROMPTS

export const getPrompts = (callback) => async dispatch => {
  try {
    const path = baseURL + 'api/prompts?getDisplayPromptsOnly=true';
    let options = optionsWithToken();
    options = { 'headers': { ...options.headers, 'getDisplayedPromptsOnly': true }}
    if (tokenInLocalStorage()) {
      const response = await axios.get(path, options);
      let data = [];
      if (response.data.original.length === 0) {
        data = [{promptText: 'No prompt available. Click the dropdown menu to create your own prompts or find public prompt collections.'}]
      } else {
        data = response.data.original
      }
      // const user_prompts = response.data['user prompts'];
      // const stored_prompts = response.data['stored prompts'];
      // const all_prompts = user_prompts.concat(stored_prompts);
      dispatch({ type: GET_PROMPTS, payload: data});
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

export const putPrompt = (updatedPrompt, id, callback) => async dispatch => {
  try {
    const path = baseURL + `api/prompts/${id}`;
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
    const path = baseURL + `api/prompts/${id}`;
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

// PROMPT COLLECTIONS

export const getPromptCollections = (callback) => async dispatch => {
  try {
    const path = baseURL + 'api/promptCollections';
    const options = optionsWithToken();
    if (tokenInLocalStorage()) {
      const response = await axios.get(path, options);

      dispatch({ type: GET_PROMPT_COLLECTIONS, payload: response.data });
      callback();
    } else {
      console.log('No token')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e});
  }
};

export const getPromptCollection = (id, callback) => async dispatch => {
  try {
    const path = baseURL + `api/promptCollections/${id}`;
    const options = optionsWithToken();

    if (tokenInLocalStorage()) {
      const response = await axios.get(path, options);

      dispatch({ type: GET_PROMPT_COLLECTION, payload: response.data });
      callback();
    } else {
      console.log('No token')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e});
  }
};

export const postPromptCollection = (collection, callback) => async dispatch => {
  try {
    const path = baseURL + 'api/promptCollections';
    if (tokenInLocalStorage()) {
      const options = optionsWithToken();
      const content = collection;
      const response = await axios.post(path, content, options);
      const promptCollectionID = Number(response.data.split(' ')[1]);
      dispatch({ type: POST_PROMPT_COLLECTION, payload: response });
      dispatch({ type: SET_PROMPT_COLLECTION_ID, payload: promptCollectionID });
      callback()
    } else {
      console.log('token absent')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}

export const putPromptCollection = (updatedCollection, callback) => async dispatch => {
  try {
    const id = updatedCollection.id;
    const path = baseURL + `api/promptCollections/${id}`;
    const options = optionsWithToken();
    const content = updatedCollection;
    const response = await axios.put(path, content, options);
    dispatch({ type: PUT_PROMPT_COLLECTION, payload: response });
    callback();
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}



export const deletePromptCollection = (id, callback) => async dispatch => {
  try {
    const path = baseURL + `api/promptCollections/${id}`;
    if (tokenInLocalStorage()) {
      const options = optionsWithToken();
      // DELETE request with gminder id
      const response = await axios.delete(path, options);
      dispatch({ type: DELETE_PROMPT_COLLECTION, payload: response });
      callback()
    } else {
      console.log('token absent')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}

// PROMPT PROMPT COLLECTIONS
export const postPromptPromptCollection = (promptCollectionID, prompts, callback) => async dispatch => {
  try {
    const path = baseURL + 'api/addPromptsToCollection';
    if (tokenInLocalStorage()) {
      const options = optionsWithToken();
      const content = {
        promptCollectionID: promptCollectionID,
        prompts: prompts  // A string of promptIDs
      }
      const response = await axios.post(path, content, options);
      dispatch({ type: POST_PROMPT_PROMPT_COLLECTION, payload: response });
      callback()
    } else {
      console.log('token absent')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}

export const deletePromptsFromCollection = (promptCollectionID, promptsToDelete, callback) => async dispatch => {
  try {
    const id = promptCollectionID;
    const path = baseURL + `api/deletePromptsFromCollection/${id}`;
    if (tokenInLocalStorage()) {
      const options = optionsWithToken();
      const content = {
        prompt_ids: promptsToDelete, // [1,2,3]
      }
      const response = await axios.delete(path, options);
      dispatch({ type: DELETE_PROMPTS_FROM_COLLECTION, payload: response });
      callback()
    } else {
      console.log('token absent')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}



// STORED PROMPT COLLECTIONS

export const getCollections = (callback) => async dispatch => {
  try {
    const path = baseURL + 'api/storedPromptCollections';
    const options = optionsWithToken();
    if (tokenInLocalStorage()) {
      const response = await axios.get(path, options);
      dispatch({ type: GET_STORED_COLLECTIONS, payload: response.data });
      callback();
    } else {
      console.log('No token')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e});
  }
};

// Adds a collection to stored_prompts table
export const postCollection = (promptCollectionID, callback) => async dispatch => {
  try {
    const path = baseURL + 'api/storedPromptCollections';
    if (tokenInLocalStorage()) {
      const options = optionsWithToken();
      const content = {
        'prompt_collection_id': promptCollectionID,
        'displayFlag': 1
      };
      const response = await axios.post(path, content, options);
      dispatch({ type: POST_STORED_COLLECTION, payload: 'success' });
      callback()
    } else {
      console.log('token absent')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}

export const putCollection = (id, displayFlag, callback) => async dispatch => {
  try {
    const path = baseURL + `api/storedPromptCollections/${id}`;
    const options = optionsWithToken();
    const content = {'displayFlag': displayFlag};
    const response = await axios.put(path, content, options);
    dispatch({ type: PUT_STORED_COLLECTION, payload: response });
    callback();
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}

export const deleteCollection = (id, callback) => async dispatch => {
  try {
    const path = baseURL + `api/storedPromptCollections/${id}`;
    if (tokenInLocalStorage()) {
      const options = optionsWithToken();
      // DELETE request with gminder id
      const response = await axios.delete(path, options);
      dispatch({ type: DELETE_STORED_COLLECTION, payload: response });
      callback()
    } else {
      console.log('token absent')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}

// USERS

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

export const putUser = (name, nickname, id, callback) => async dispatch => {
  try {
    const path = baseURL + `api/users/${id}`;
    const options = optionsWithToken();
    const content = { 'name': name, 'nickname': nickname};
    const response = await axios.put(path, content, options);
    dispatch({ type: PUT_USER, payload: { 'name': name, 'nickname': nickname} });
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: { 'name': '', 'username': 'User name already taken' }});
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}

export const postPassword = (oldPassword, password, password_confirmation, callback) => async dispatch => {
  try {
    const path = baseURL + 'api/auth/change';
    const options = optionsWithToken();
    if (tokenInLocalStorage()) {
      const content = { 'oldPassword': oldPassword, 'newPassword': password, 'newPassword_confirmation': password_confirmation };
      const response = await axios.post(path, content, options);
      dispatch({ type: POST_PASSWORD, payload: response });
      callback();
    } else {
      console.log('No token')
    }
  } catch (e) {
    dispatch({ type: RESPONSE_ERROR, payload: e });
  }
}
