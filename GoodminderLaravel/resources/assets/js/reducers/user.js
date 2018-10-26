import { UPDATE_USER } from '../actions/types';

const initialState = {
    email: '',
    username: ''
  };

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USER:
      return { ...state, email: action.payload.email, username: action.payload.username };
    default:
      return state;
  }
}
