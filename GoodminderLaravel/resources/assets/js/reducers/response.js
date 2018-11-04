import { RESPONSE, RESPONSE_ERROR } from '../actions/types';

const initialState = {
  response: '',
  responseError: ''
};
export default function(state = initialState, action) {
  switch(action.type) {
    case RESPONSE:
      return { response: action.payload, responseError: '' };
    case RESPONSE_ERROR:
      return { response: '', responseError: action.payload };
    default:
      return state;
  }
}
