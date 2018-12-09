import { SET_CURRENT_GM, SET_PREVIOUS_GM,
  SET_BACK_GM, SET_UPDATED_GM,
  SET_CURRENT_PROMPT, SET_COLLECTION, GET_NICKNAME,
  SET_CURRENT_PROMPT_COLLECTION, GET_PROMPT_COLLECTION,
  SET_CURRENT_STORED_PROMPT_COLLECTION, SET_DISPLAY_GM,
  POST_PROMPT_COLLECTION } from '../actions/types';

import { NAV_BACK, NAV_NEXT, NAV_CLEAR } from '../actions/types';

const initialState = {
    currentGM: {},
    previousGM: [],
    backGM: 0,
    displayGM: 'random',
    currentPrompt: {},
    collection: '',
    updatedGM: {},
    nickname: '',
    currentPromptCollectionID: '',
    currentPromptCollection: [],
    currentStoredPromptCollection: {},

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
    case SET_UPDATED_GM:
      return { ...state, updatedGM: action.payload };
    case SET_DISPLAY_GM:
      return { ...state, displayGM: action.payload };
    case SET_CURRENT_PROMPT:
      return { ...state, currentPrompt: action.payload };
    case SET_COLLECTION:
      return { ...state, collection: action.payload };
    case SET_CURRENT_PROMPT_COLLECTION:
      return { ...state, currentPromptCollection: action.payload };
    case SET_CURRENT_STORED_PROMPT_COLLECTION:
      return { ...state, currentStoredPromptCollection: action.payload };
    case GET_PROMPT_COLLECTION:
      return { ...state, currentPromptCollection: action.payload };
    case POST_PROMPT_COLLECTION:
      return { ...state, currentPromptCollectionID: action.payload };
    case NAV_BACK:
      return { ...state}
    case NAV_NEXT:
      // action.payload is goodminder to add
      return { ...state, previousGM: [ ...state.previousGM, action.payload ]};
    case GET_NICKNAME:
      return { ...state, nickname: action.payload };
    default:
      return state;
  }
}
