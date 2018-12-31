import { AUTH_USER, AUTH_ERROR, CLEAR_AUTH_ERROR, POST_RESET,
  POST_PASSWORD, POST_CONTACT, DELETE_USER } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  response: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case CLEAR_AUTH_ERROR:
      return { ...state, errorMessage: '' };
    case POST_RESET:
      return { ...state, response: action.payload};
    case POST_PASSWORD:
      return { ...state, response: action.payload};
    case POST_CONTACT:
      return { ...state, response: action.payload};
    case DELETE_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}
