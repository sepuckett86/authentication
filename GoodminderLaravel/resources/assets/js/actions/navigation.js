import { SET_CURRENT_GM, SET_PREVIOUS_GM, SET_BACK_GM, SET_UPDATED_GM,
  SET_CURRENT_PROMPT, SET_COLLECTION, SET_CURRENT_PROMPT_COLLECTION,
  SET_CURRENT_STORED_PROMPT_COLLECTION} from './types';
import { NAV_BACK, NAV_NEXT, NAV_CLEAR } from './types';

export function navClear() {
  return {
    type: NAV_CLEAR
  }
}

export function navBack() {
  return {
    type: NAV_BACK
  }
}

export function navNext(goodminder) {
  return {
    type: NAV_NEXT,
    payload: goodminder
  }
}

export function setCurrentGM(goodminder) {
  // example date format: 2018-11-21 15:33:23
  const fullDate = goodminder.created_at;
  const date = fullDate.split(' ')[0];
  const goodminderWithDate = { ...goodminder, date: date }
  return {
    type: SET_CURRENT_GM,
    payload: goodminderWithDate
  }
}

export function setPreviousGM(goodminderArray) {
  return {
    type: SET_PREVIOUS_GM,
    payload: goodminderArray
  }
}

export function setBackGM(int) {
  return {
    type: SET_BACK_GM,
    payload: int
  }
}

export function setUpdatedGM(goodminder) {
  return {
    type: SET_UPDATED_GM,
    payload: goodminder
  }
}

export function setCurrentPrompt(prompt) {
  return {
    type: SET_CURRENT_PROMPT,
    payload: prompt
  }
}

export function setCollection(collection) {
  return {
    type: SET_COLLECTION,
    payload: collection
  }
}

export function setCurrentPromptCollection(collection) {
  return {
    type: SET_CURRENT_PROMPT_COLLECTION,
    payload: collection
  }
}

export function setCurrentStoredPromptCollection(collection) {
  return {
    type: SET_CURRENT_STORED_PROMPT_COLLECTION,
    payload: collection
  }
}
