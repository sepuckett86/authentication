import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class LogOutCheck extends Component {
  componentDidMount() {
    this.props.postSignout();
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
          <p>You are logged in. {' '}
            <Link to='/logout' onClick={() => this.props.changeAuth(false).bind(this)} className='btn btn-goodminder btn-sm'>
              <i className="fas fa-arrow-circle-right"></i>{' '}Click here to log out.
            </Link>
          </p>
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
