import { CHANGE_HOME_DISPLAY, CHANGE_ADD_DISPLAY, CLEAR_GOODMINDERS } from './types';
import { AUTH_USER, AUTH_ERROR, PUT_USER } from './types';

export * from './API_Request';
export * from './navigation';

export function changeHomeDisplay(display) {
  return {
    type: CHANGE_HOME_DISPLAY,
    payload: display
  }
}

export function changeAddDisplay(display) {
  return {
    type: CHANGE_ADD_DISPLAY,
    payload: display
  }
}


export function changeAuth(payload) {
  return {
    type: AUTH_USER,
    payload: payload
  }
}

export function clearGoodminders() {
  return {
    type: CLEAR_GOODMINDERS,
    payload: []
  }
}


export function clearError() {
  return {
    type: AUTH_ERROR,
    payload: ''
  }
}
