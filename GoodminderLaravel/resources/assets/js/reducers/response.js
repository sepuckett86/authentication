import { RESPONSE, RESPONSE_ERROR, CLEAR_RESPONSE } from '../actions/types';
import { POST_PROMPT_COLLECTION } from '../actions/types';

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
    case POST_PROMPT_COLLECTION:
      return { ...state, response: action.payload }
    default:
      return state;
  }
}
