import { GET_COLLECTIONS, POST_COLLECTION } from '../actions/types';

// This state is an array of prompt collections.
// Each prompt collection is in this format: { collection, creator_id }
export default function(state = [], action) {
  switch(action.type) {
    case GET_COLLECTIONS:
      return action.payload;
    case POST_COLLECTION:
      return [...state, action.payload];
    default:
      return state;
  }
}
