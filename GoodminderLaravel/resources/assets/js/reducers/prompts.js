import { GET_PROMPTS, POST_PROMPT, PUT_PROMPT, DELETE_PROMPT } from '../actions/types';

const initialState = [];
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PROMPTS:
      return action.payload;
    case POST_PROMPT:
      return state;
    case PUT_PROMPT:
      return state;
    case DELETE_PROMPT:
      return state;
    default:
      return state;
  }
}
