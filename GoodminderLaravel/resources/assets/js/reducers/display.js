import { CHANGE_HOME_DISPLAY, CHANGE_ADD_DISPLAY } from '../actions/types';

const initialState = {
    home: '',
    add: 'prompt'
  };

export default function(state = initialState, action) {
  switch(action.type) {
    case CHANGE_HOME_DISPLAY:
      return { ...state, home: action.payload };
    case CHANGE_ADD_DISPLAY:
      return { ...state, add: action.payload };
    default:
      return state;
  }
}
