import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

import decode from 'jwt-decode';

class LogOutCheck extends Component {
  componentDidMount() {
    this.props.postSignout();
    this.props.clearGoodminders();
  }

  checkAuth() {
    if (!this.props.auth) {
      return (
        <div>
          <p>You have been successfully logged out.</p>
          <br />
          <hr />

        <p>Log in again:  {' '}
          <Link to='/login' className='btn btn-green '>
            <i className="fas fa-arrow-circle-right"></i>{' '}Log In
          </Link>
        </p>
        <p>Create new user: {' '}
          <Link to='/signup' className='btn btn-green '>
            <i className="fas fa-arrow-circle-right" ></i>{' '}Sign Up
          </Link>
        </p>
        <p>Visit welcome page:  {' '}
          <Link to='/intro' className='btn btn-green '>
            <i className="fas fa-arrow-circle-right"></i>{' '}Welcome
          </Link>
        </p>
        </div>
      )
    } else {
      return (
        <div>
          <p>Logging out.</p>
          <br />
          <p>If this screen does not refresh, use the following button:</p>
          <div style={{'display': 'flex', 'justifyContent': 'space-around'}}>
            <button onClick={() => this.props.postSignout()} className='btn btn-green '>
              <i className="fas fa-arrow-circle-right"></i>{' '}Log out.
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
