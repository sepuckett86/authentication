
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';

import Example from './components/Example';
import Home from './components/Home';
import Login from './components/Login';
import Forgot from './components/Forgot';

// Note: Put ALL ROUTES in this file
if (document.getElementById('root')) {
    ReactDOM.render(
      <BrowserRouter>
        <div>
          <Navbar />
          <Route exact={true} path="/" component={Home}/>
          <Route path="/example" component={Example}/>
          <Route path="/login" component={Login}/>
          <Route path="/forgotpassword" component={Forgot}/>
        </div>
      </BrowserRouter>, document.getElementById('root'));
}
