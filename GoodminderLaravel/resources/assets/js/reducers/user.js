import { GET_USER, PUT_USER } from '../actions/types';

const initialState = {
    email: '',
    name: '',
    backend: ''
  };

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USER:
      return { ...state, backend: action.payload, email: action.payload.email, name: action.payload.name }
    case PUT_USER:
      return { ...state, backend: action.payload, email: action.payload.email, name: action.payload.name };
    default:
      return state;
  }
}
