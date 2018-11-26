import { CHANGE_HOME_DISPLAY, CHANGE_ADD_DISPLAY, CHANGE_MANAGER_DISPLAY } from '../actions/types';

const initialState = {
    home: '',
    add: 'empty',
    manager: ''
  };

export default function(state = initialState, action) {
  switch(action.type) {
    case CHANGE_HOME_DISPLAY:
      return { ...state, home: action.payload };
    case CHANGE_ADD_DISPLAY:
      return { ...state, add: action.payload };
    case CHANGE_MANAGER_DISPLAY:
      return { ...state, manager: action.payload }
    default:
      return state;
  }
}
