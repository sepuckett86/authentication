import { SAVE_GOODMINDER, CHANGE_HOME_DISPLAY, CHANGE_ADD_DISPLAY } from './types';
import { UPDATE_USER } from './types';

export * from './API_Request';
export * from './navigation';

export function saveGoodminder(goodminder) {
  return {
    type: SAVE_GOODMINDER,
    payload: goodminder
  }
}

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

export function updateUser(email, username) {
  return {
    type: UPDATE_USER,
    payload: {email: email, username: username}
  }
}
