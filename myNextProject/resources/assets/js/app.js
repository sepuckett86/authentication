
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */


// Note: Put ALL ROUTES in this file
//
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Navbar from './components/Navbar';
import Example from './components/Example';
import Home from './components/Home';
import Login from './components/Login';
import Forgot from './components/Forgot';
import Register from './components/Register';
import Logout from './components/Logout';
import AuthService from './components/AuthService';

import '../css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
    this.Auth = new AuthService();
    this.checkToken = this.checkToken.bind(this);
  }
  componentDidMount() {
    this.checkToken()
  }

  checkToken() {
    let loggedIn = this.Auth.loggedIn();
    console.log(loggedIn);
    this.setState({
      loggedIn: loggedIn
    })
  }

  render() {
    return(

        <div>
          <Navbar loggedIn={this.state.loggedIn}/>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/example" component={Example}/>
          <Route path="/login" component={Login}/>
          <Route path="/forgotpassword" component={Forgot}/>
          <Route path="/register" component={Register}/>
          <Route path="/logout" component={Logout}/>
        </div>


    )
  }
}

export default App;


if (document.getElementById('root')) {

    ReactDOM.render(<BrowserRouter forceRefresh={true}><App/></BrowserRouter>
      , document.getElementById('root'));
}
