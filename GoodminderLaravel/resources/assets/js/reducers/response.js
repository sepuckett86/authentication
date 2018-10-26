import { RESPONSE } from '../actions/types';

const initialState = {
  response: ''
};
export default function(state = initialState, action) {
  switch(action.type) {
    case RESPONSE:
      return { response: action.payload };
    default:
      return state;
  }
}
