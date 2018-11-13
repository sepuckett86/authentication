require('./bootstrap');

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const INITIAL_STATE = {
  auth: { authenticated: localStorage.getItem('id_token') }
}

const logger = createLogger({
  collapsed: true
});

export default ({ children, state = INITIAL_STATE }) => {
  const store = createStore(
    reducers,
    state,
    applyMiddleware(reduxThunk, logger)
  );
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
