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

        <h1>Settings</h1>
        <h2>Account Information</h2>
        <p>Email: {this.props.user.email}</p>
        <p>Private Nickname: {this.props.user.nickname || 'no data'}</p>
        <p>Public Username: {this.props.user.name || 'no data'}</p>
        <button className="btn btn-green" onClick={() => {console.log('Not enabled yet')}}>Change password</button>
        <br /><br />
        <button className="btn btn-green" onClick={() => {this.props.deleteUser()}}>Delete Account</button>
        <br /><br />
        <Link to="/">
        <button
        id='random'
        name="Back"
        className='btn btn-custom'
        onClick={() => this.props.changeHomeDisplay('goodminders')}>
        <i className="fas fa-home"></i>{' '}Back to Home</button>
              </Link>
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
