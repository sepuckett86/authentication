import { saveGoodminder, changeAuth } from 'actions';
import { SAVE_GOODMINDER, CHANGE_AUTH } from 'actions/types';

describe('saveGoodminder', () => {
  it('has the correct type', () => {
    const action = saveGoodminder();

    expect(action.type).toEqual(SAVE_GOODMINDER);
  });

  it('has the correct payload', () => {
    const action = saveGoodminder('My comment');

    expect(action.payload).toEqual('My comment');
  })
});

describe('changeAuth', () => {
  it('has the correct type', () => {
    const action = changeAuth();

    expect(action.type).toEqual(CHANGE_AUTH);
  });

  it('has the correct payload', () => {
    const action = changeAuth(true);

    expect(action.payload).toEqual(true);
  })
});
