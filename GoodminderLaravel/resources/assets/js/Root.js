import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const INITIAL_STATE = {
  auth: { authenticated: localStorage.getItem('token') }
}
export default ({ children, state = INITIAL_STATE }) => {
  const store = createStore(
    reducers,
    state,
    applyMiddleware(reduxThunk)
  );
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
