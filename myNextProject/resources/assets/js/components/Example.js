import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AuthService from './AuthService';
import withAuth from './withAuth';

class Example extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService();
    this.state = {
      gminder: '',
      hello: '',
      user: ''
    }
  }

  componentDidMount() {
    let hello = '';
    let gminder = '';

      this.Auth.fetch('/api/hello').then(response => {
        hello = response.message
        this.setState({
          hello: hello
        })
      })
      this.Auth.fetch('/api/gminders').then(response => {
        if(response){
          gminder = response;
          this.setState({
            gminder: gminder.mainResponse
          })
        }
      })
      const token = this.Auth.getToken();
      let user = {};
      this.Auth.fetch('/api/auth/me'
        ).then(response => {
        user = response
        this.setState({
          user: user
        })
      })


  }
    render() {

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">Example: API testing</div>
                            <div className="card-body">
                                <p>You are logged in. </p>
                                <p>Path: /api/auth/me</p>
                                <div className='alert alert-primary' role="alert">
                                  <p>ID: {this.state.user.id}</p>
                                  <p>Name: {this.state.user.name}</p>
                                  <p>E-mail: {this.state.user.email}</p>

                                </div>
                                <p>Path: /api/hello</p>
                                <p className='alert alert-primary' role="alert">{this.state.hello}</p>
                                <p>Path: /api/gminders</p>
                                <p className='alert alert-primary' role="alert">{this.state.gminder}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(Example);
