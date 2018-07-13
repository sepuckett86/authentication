// Master.js
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Example from './Example';
import Home from './Home';


class Navbar extends Component {
  render(){
    return (


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
    <a className="dropdown-item" href="/login">Login</a>
  </div>
</div>

         </nav>




    )
  }
}
export default Navbar;
