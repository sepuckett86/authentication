import { RESPONSE, RESPONSE_ERROR, CLEAR_RESPONSE } from '../actions/types';

const initialState = {
  response: '',
  responseError: {}
};
export default function(state = initialState, action) {
  switch(action.type) {
    case RESPONSE:
      return { response: action.payload, responseError: {} };
    case RESPONSE_ERROR:
      return { response: '', responseError: action.payload };
    case CLEAR_RESPONSE:
      return initialState
    default:
      return state;
  }
}
