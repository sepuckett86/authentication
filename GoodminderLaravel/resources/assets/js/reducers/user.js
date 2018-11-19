import { GET_USER, PUT_USER } from '../actions/types';

const initialState = {
    email: '',
    nickname: '',
    name: '',
    backend: ''
  };

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USER:
      return { ...state, backend: action.payload, email: action.payload.email, name: action.payload.name, nickname: action.payload.nickname  }
    case PUT_USER:
      return { ...state, backend: action.payload, email: action.payload.email, name: action.payload.name, nickname: action.payload.nickname };
    default:
      return state;
  }
}
