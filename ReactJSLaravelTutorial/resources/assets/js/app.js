
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Master from './components/Master';

import Example from './components/Example';
import Home from './components/Home';

// Note: Put ALL ROUTES in this file
if (document.getElementById('root')) {
    ReactDOM.render(
      <BrowserRouter>
        <div>
          <Master />
          <Route exact={true} path="/" component={Home}/>
          <Route path="/example" component={Example}/>
        </div>
      </BrowserRouter>, document.getElementById('root'));
}
