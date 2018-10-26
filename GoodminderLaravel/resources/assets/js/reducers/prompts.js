import { SAVE_GOODMINDER } from '../actions/types';

const initialState = [
  {
    id: 1,
    collection: 'Favorites',
    promptText: 'What is a song that made you smile in the past month?'
  }
  ];
export default function(state = initialState, action) {
  switch(action.type) {
    case SAVE_GOODMINDER:
      return [...state, action.payload];
    default:
      return state;
  }
}
