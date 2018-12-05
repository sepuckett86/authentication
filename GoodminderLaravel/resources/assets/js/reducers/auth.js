import { AUTH_USER, AUTH_ERROR, CLEAR_AUTH_ERROR, POST_RESET } from '../actions/types';

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
      return { ...state, response: action.payload}
    default:
      return state;
  }
}
