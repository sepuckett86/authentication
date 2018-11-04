import { GET_PROMPTS } from '../actions/types';

const initialState = [
  {
    id: 1,
    collection: 'Favorites',
    promptText: 'What is a song that made you smile in the past month?'
  }
  ];
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PROMPTS:
      return action.payload;
    default:
      return state;
  }
}
