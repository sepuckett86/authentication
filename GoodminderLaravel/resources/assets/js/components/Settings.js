import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import requireAuth from './auth/requireAuth';

class Settings extends Component {

  render() {
    return (
      <div className='log-box'>
        <h1>Settings</h1>
        <h2>Account Information</h2>
        <p>Email: {this.props.user.email}</p>

        <p>Enter what will help you have a more personal Goodminder experience</p>
        <p>Name: {this.props.user.name}</p>
        <p>User name: {this.props.user.username}</p>
        <p>Change password button</p>
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
