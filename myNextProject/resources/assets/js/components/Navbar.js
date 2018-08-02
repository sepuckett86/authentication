// Master.js
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import AuthService from './AuthService';

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService();
    }

  render() {

    return (
      (this.Auth.loggedIn() ?
        <nav className="navbar navbar-light bg-light">
        <a href='/' className="navbar-brand">MyAwesomeApp</a>
        <div className="dropdown show">
          <span className="navbar-text">
      Logged In!
    </span>
          <a className="btn btn-info dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Menu
          </a>

          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="/">Home</a>
            <a className="dropdown-item" href="/example">Example</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/logout">Log Out</a>
          </div>
        </div>

      </nav> :
      <nav className="navbar navbar-light bg-light">
      <a href='/' className="navbar-brand">MyAwesomeApp</a>
      <div className="dropdown show">

        <a className="btn btn-info dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
        </a>

        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
          <a className="dropdown-item" href="/">Home</a>
          <a className="dropdown-item" href="/example">Example</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/register">Register</a>
          <a className="dropdown-item" href="/login">Login</a>
        </div>
      </div>

    </nav>)
  )
  }
}
export default Navbar;
