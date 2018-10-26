import authReducer from 'reducers/auth';
import { CHANGE_AUTH } from 'actions/types';

it('handles actions of type CHANGE_AUTH and payload false', () => {
  const action = {
    type: CHANGE_AUTH,
    payload: false,
  };
  const newState = authReducer('', action);
  expect(newState).toEqual(false);
});

it('handles actions of type CHANGE_AUTH and payload true', () => {
  const action = {
    type: CHANGE_AUTH,
    payload: true,
  };
  const newState = authReducer('', action);
  expect(newState).toEqual(true);
});

it('handles action with unknown type', () => {
  const action = {
    type: 'XXXX',
    payload: 'bla',
  };
  const newState = authReducer([], action);
  expect(newState).toEqual([]);
});
