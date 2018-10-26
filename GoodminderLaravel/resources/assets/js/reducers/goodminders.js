import { SAVE_GOODMINDER } from '../actions/types';

const initialState = [
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
export default function(state = initialState, action) {
  switch(action.type) {
    case SAVE_GOODMINDER:
      return [...state, action.payload];
    default:
      return state;
  }
}
