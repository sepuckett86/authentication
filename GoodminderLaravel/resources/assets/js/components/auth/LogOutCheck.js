import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

import decode from 'jwt-decode';

class LogOutCheck extends Component {
  componentDidMount() {
    this.props.postSignout();
  }
  loggedIn() {
      // Checks if there is a saved token and it's still valid
      const token = this.getToken() // GEtting token from localstorage
      let test = !!token && !this.isTokenExpired(token)
      if (test) {
        console.log("Logged In")
      } else {
        console.log("Not logged in")
      }
      return test // handwaiving here
  }
  getToken() {
      // Retrieves the user token from localStorage
      return localStorage.getItem('id_token')
  }
  removeToken() {
    localStorage.removeItem('id_token');
    return localStorage.getItem('id_token')
  }
  isTokenExpired(token) {
      try {
          const decoded = decode(token);
          if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
              return true;
          }
          else
              return false;
      }
      catch (err) {
          return false;
      }
  }
  checkAuth() {
    if (!this.props.auth) {
      return (
        <div>
          <p>You have been successfully logged out.</p>
          <br />
          <hr />

        <p>Log in again:  {' '}
          <Link to='/login' className='btn btn-goodminder btn-sm'>
            <i className="fas fa-arrow-circle-right"></i>{' '}Log In
          </Link>
        </p>
        <p>Create new user: {' '}
          <Link to='/signup' className='btn btn-goodminder btn-sm'>
            <i className="fas fa-arrow-circle-right" ></i>{' '}Sign Up
          </Link>
        </p>
        <p>Visit welcome page:  {' '}
          <Link to='/intro' className='btn btn-goodminder btn-sm'>
            <i className="fas fa-arrow-circle-right"></i>{' '}Welcome
          </Link>
        </p>
        </div>
      )
    } else {
      return (
        <div>
          <p>You are logged in. {' '}</p>
          <div style={{'display': 'flex', 'justifyContent': 'space-around'}}>
            <button onClick={() => this.props.postSignout()} className='btn btn-goodminder btn-sm'>
              <i className="fas fa-arrow-circle-right"></i>{' '}Log out.
            </button>
            <button onClick={() => this.loggedIn()} className='btn btn-goodminder btn-sm'>
              <i className="fas fa-arrow-circle-right"></i>{' '}Check log in status.
            </button>
            <button onClick={() => this.removeToken()} className='btn btn-goodminder btn-sm'>
              <i className="fas fa-arrow-circle-right"></i>{' '}Remove token.
            </button>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <div className='log-box'>{this.checkAuth()}</div>

    )
  }
};

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}
export default connect(mapStateToProps, actions)(LogOutCheck);
