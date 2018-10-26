import { SET_CURRENT_GM, SET_PREVIOUS_GM, SET_BACK_GM, SET_CURRENT_PROMPT } from './types';
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
  return {
    type: SET_CURRENT_GM,
    payload: goodminder
  }
}

export function setPreviousGM(goodminders) {
  return {
    type: SET_PREVIOUS_GM,
    payload: goodminders
  }
}

export function setBackGM(int) {
  return {
    type: SET_BACK_GM,
    payload: int
  }
}

export function setCurrentPrompt(prompt) {
  return {
    type: SET_CURRENT_PROMPT,
    payload: prompt
  }
}
