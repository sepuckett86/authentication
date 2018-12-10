import { GET_PROMPT_COLLECTIONS,
 PUT_PROMPT_COLLECTION, DELETE_PROMPT_COLLECTION, POST_PROMPT_PROMPT_COLLECTION } from '../actions/types';

// This state is an array of prompt collections. ALL PUBLIC PROMPT COLLECTIONS.
// Each prompt collection is in this format: { collection, creator_id }
export default function(state = [], action) {
  switch(action.type) {
    case GET_PROMPT_COLLECTIONS:
      return action.payload;
    case PUT_PROMPT_COLLECTION:
      return state;
    case DELETE_PROMPT_COLLECTION:
      return state;
    case POST_PROMPT_PROMPT_COLLECTION:
      return state;
    default:
      return state;
  }
}
