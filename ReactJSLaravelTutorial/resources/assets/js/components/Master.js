// Master.js
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Example from './Example';
import Home from './Home';


class Master extends Component {
  render(){
    return (

      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">MyApp</a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active"><a href="/">Home</a></li>
              <li><a href="/example">Example</a></li>

            </ul>
          </div>
      </nav>


      </div>

    )
  }
}
export default Master;
