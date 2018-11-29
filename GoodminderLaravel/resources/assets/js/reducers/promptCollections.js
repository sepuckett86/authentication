import { GET_PROMPT_COLLECTIONS, POST_PROMPT_COLLECTION,
 PUT_PROMPT_COLLECTION, DELETE_PROMPT_COLLECTION } from '../actions/types';

// This state is an array of prompt collections.
// Each prompt collection is in this format: { collection, creator_id }
export default function(state = [], action) {
  switch(action.type) {
    case GET_PROMPT_COLLECTIONS:
      return action.payload;
    case POST_PROMPT_COLLECTION:
      return state;
    case PUT_PROMPT_COLLECTION:
      return state;
    case DELETE_PROMPT_COLLECTION:
      return state;
    default:
      return state;
  }
}
