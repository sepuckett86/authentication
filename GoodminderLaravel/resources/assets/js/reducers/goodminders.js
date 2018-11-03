import { GET_GOODMINDERS, POST_GOODMINDER,
  PUT_GOODMINDER, DELETE_GOODMINDER, CLEAR_GOODMINDERS } from '../actions/types';

/* const initialState = [
  {
    id: 1,
    userID: 1,
            category: 'prompt',
            mainResponse: 'Legend of Kyrandia Emerald Room Song by Frank Klepacki',
            author: null,
            promptID: 1,
            reason: 'After wandering through endless caves in the game with repetitive music, the music changes for only one scene to a complex, long, cool song. It reminds me of all that is great about old school adventure games.',
            source: null,
            who: null,
            rating: 4,
            recordedDate: 'June 8, 2018',
            eventDate: null,
            updatedDate: 'June 8, 2018',
            collection: 'Favorites',
            publicFlag: 0,
  }
]
*/
export default function(state = [], action) {
  switch(action.type) {
    case GET_GOODMINDERS:
      return action.payload
    case POST_GOODMINDER:
      return [...state, action.payload];
    case CLEAR_GOODMINDERS:
      return action.payload;
    case PUT_GOODMINDER:
      return action.payload
    case DELETE_GOODMINDER:
      return action.payload
    default:
      return state;
  }
}
