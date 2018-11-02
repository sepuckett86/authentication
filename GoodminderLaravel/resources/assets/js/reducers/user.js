import { GET_USER, UPDATE_USER } from '../actions/types';

const initialState = {
    email: '',
    username: '',
    backend: ''
  };

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USER:
      return { ...state, backend: action.payload, email: action.payload.email }
    case UPDATE_USER:
      return { ...state, email: action.payload.email, username: action.payload.username };
    default:
      return state;
  }
}
