import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import AuthService from './AuthService';
import withAuth from './withAuth';

class Example extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService();
    this.state = {
      gminders: '',
      hello: '',
      user: '',
      inputAnswer: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let hello = '';
    let gminders = '';

    this.Auth.fetch('/api/hello').then(response => {
      hello = response.message
      this.setState({hello: hello})
    })
    this.Auth.fetch('/api/gminders').then(response => {
      if (response) {
        gminders = response;
        this.setState({gminders: gminders})
      }
    })
    const token = this.Auth.getToken();
    let user = {};
    this.Auth.fetch('/api/auth/me').then(response => {
      user = response
      this.setState({user: user})
    })
  }

  handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
  }

  handleClick(event) {
    if (event.target.name === 'submitButton') {
      // prevent standard submit action
      event.preventDefault();
      const gminder = this.state.inputAnswer;
      // POST request
      this.Auth.fetch('/api/gminders', {
        method: "POST",
        body: JSON.stringify({mainResponse: gminder})
    })
    }
    if (event.target.name === 'deleteButton') {
      const id = event.target.id;
      // DELETE request
      this.Auth.fetch(`/api/gminders/${id}`, {
        method: "DELETE",
    })
  }

  }

  render() {

    return (<div className="container">
      <div className="row justify-content-center">
        <div className="col">
          <div className="card">
            <div className="card-header">Example: API testing</div>
            <div className="card-body">
              <p>You are logged in.
              </p>
              <p>GET request. Path: /api/auth/me</p>
              <div className='alert alert-primary' role="alert">
                <p>ID: {this.state.user.id}</p>
                <p>Name: {this.state.user.name}</p>
                <p>E-mail: {this.state.user.email}</p>

              </div>
              <p>GET request. Path: /api/hello</p>
              <p className='alert alert-primary' role="alert">{this.state.hello}</p>
              <p>GET request. Path: /api/gminders</p>
              <p>Delete buttons are DELETE request. Path: /api/gminders/id</p>
              {
                this.state.gminders
                  ? this.state.gminders.map((gminder, i) => {
                    return (<div key={i}><p className='alert alert-primary'
                      role="alert">{gminder.mainResponse} <button id={gminder.id} name='deleteButton'
                        onClick={this.handleClick}>Delete</button></p>

                      </div>)
                  })
                  : <p>
                      Querying API
                    </p>
              }
              {
                this.state.gminders[0]
                  ? null
                  : <p className='alert alert-primary' role="alert">No available gminders for this user</p>
              }
              <p>POST request. Path: /api/gminders</p>
              <form className='alert alert-primary' role="alert">
              <div className="form-group">

                  <label>Enter Anything</label>
                  <textarea name='inputAnswer' className="form-control" value={this.state.inputAnswer} onChange={this.handleChange} rows="3"></textarea>
                  <br />
              </div>
              <button name='submitButton' type="submit" onClick={this.handleClick}>Add gminder</button>
              </form>

            </div>

          </div>
        </div>
      </div>
    </div>);
  }
}

export default withAuth(Example);
