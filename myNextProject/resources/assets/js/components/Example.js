import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AuthService from './AuthService';

class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
    this.Auth = new AuthService();
  }
  componentWillMount() {
    if(this.Auth.loggedIn()) {
      this.setState({
        loggedIn: true
      })
    }

   }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>
                            {(this.state.loggedIn ? <div className="card-body">
                                <p>You are logged in. </p>
                                <p>Special content here</p>
                            </div> : <div className="card-body">
                                <p>I'm an example component!</p>
                                <p>Here is where user-specific content will go!</p>
                            </div>)}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Example;
