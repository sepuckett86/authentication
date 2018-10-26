import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from './js/Root';
import App from './js/components/App';

ReactDOM.render(
  <Root>
    <BrowserRouter>
        <Route path='/' component={App} />
    </BrowserRouter>
  </Root>,
  document.querySelector('#root')
);
