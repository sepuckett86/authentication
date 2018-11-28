import { GET_STORED_COLLECTIONS, POST_STORED_COLLECTION, PUT_STORED_COLLECION,
  DELETE_STORED_COLLECTION } from '../actions/types';

// This state is an array of prompt collections.
// Each prompt collection is in this format: { collection, creator_id }
export default function(state = [], action) {
  switch(action.type) {
    case GET_STORED_COLLECTIONS:
      return action.payload;
    case POST_STORED_COLLECTION:
      return [...state, action.payload];
    case PUT_STORED_COLLECTION:
      return state;
    case DELETE_STORED_COLLECTION:
      return state;
    default:
      return state;
  }
}
