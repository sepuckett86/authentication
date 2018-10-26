import { SET_CURRENT_GM, SET_PREVIOUS_GM,
  SET_BACK_GM, SET_CURRENT_PROMPT } from '../actions/types';

import { NAV_BACK, NAV_NEXT, NAV_CLEAR } from '../actions/types';

const initialState = {
    currentGM: {},
    previousGM: [],
    backGM: 0,
    currentPrompt: {},
  };

export default function(state = initialState, action) {
  switch(action.type) {
    case NAV_CLEAR:
      return { ...initialState }
    case SET_CURRENT_GM:
      return { ...state, currentGM: action.payload };
    case SET_PREVIOUS_GM:
      return { ...state, previousGM: action.payload };
    case SET_BACK_GM:
      return { ...state, backGM: action.payload };
    case SET_CURRENT_PROMPT:
      return { ...state, currentPrompt: action.payload };
    case NAV_BACK:
      return { ...state}
    case NAV_NEXT:
      // action.payload is goodminder to add
      return { ...state, previousGM: [ ...state.previousGM, action.payload ]};
    default:
      return state;
  }
}
