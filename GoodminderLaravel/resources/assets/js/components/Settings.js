import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import requireAuth from './auth/requireAuth';
import { Link } from 'react-router-dom';

class Settings extends Component {

  render() {
    return (
      <div>
      <div className='log-box'>

      <button>
      <Link to="/" className="dropdown-item">Back to Home</Link>
      </button>
        <br />
          <br />
        <h1>Settings</h1>
        <h2>Account Information</h2>
        <p>Email: {this.props.user.email}</p>
        <p>Name: {this.props.user.name || 'no data'}</p>
        <p>User name: {this.props.user.username || 'no data'}</p>
        <button onClick={() => {console.log('Not enabled yet')}}>Change password</button>
        <br /><br />
        <button onClick={() => {this.props.deleteUser()}}>Delete Account</button>
      </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}


export default connect(mapStateToProps, actions)(requireAuth(Settings, '/login'));
