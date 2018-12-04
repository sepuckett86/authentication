import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import requireAuth from './auth/requireAuth';
import { Link } from 'react-router-dom';

import { textFails } from './functions';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: 'none',
      inputName: this.props.user.name || '',
      inputUsername: this.props.user.nickname || ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.clearResponse();
    this.props.setAuthError({username: '', name: ''})
  }

  handleClick(e) {
    // Make requests to backend to change data
    if (e.currentTarget.name === this.state.edit) {
      switch(e.currentTarget.name) {
        case 'editName':
          this.props.clearError();
          if (textFails(this.state.inputName)) {
            this.props.setAuthError({name: textFails(this.state.inputName)[0], username: ''});
            break;
          }
          this.props.putUser(this.state.inputName, this.props.user.nickname, this.props.user.backend.id, ()=> {
            this.props.getUser();
          })
          break;
        case 'editUsername':
          this.props.clearError();
          if (textFails(this.state.inputUsername)) {
            this.props.setAuthError({username: textFails(this.state.inputUsername)[0], name: ''});
            break;
          }
        this.props.putUser(this.props.user.name, this.state.inputUsername, this.props.user.backend.id, ()=> {
          this.props.getUser();
        })
        if (this.props.responseError) {
          this.setState({
            inputUsername: ''
          })
        }
          break;
        default:
          break;
      }
    }
    // Change this.state.edit to reflect the field being edited
    if (e.currentTarget.name === 'editEmail' ||
        e.currentTarget.name === 'editName' ||
        e.currentTarget.name === 'editUsername') {
      if (e.currentTarget.name === this.state.edit) {
        this.setState({
          edit: 'none'
        })
      } else {
        this.setState({
          edit: e.currentTarget.name
        })
      }
    }

  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  renderEdit(field) {
    const edit = this.state.edit;
    switch(field) {
      case 'editEmail':
        if (edit === field) {
          return ( <p>
                    <b>E-mail</b>:{' '}
                    {this.props.user.email}{' '}
                    <button name='editEmail' onClick={this.handleClick} className="btn-flat btn-blue">
                      <i className="fas fa-edit"></i>
                    </button>
                    <br />
                    E-mail change feature not yet enabled
                  </p>);
        } else {
          return (  <p>
                    <b>E-mail</b>:{' '}
                    {this.props.user.email}{' '}
                    <button name='editEmail' onClick={this.handleClick} className="btn-flat btn-blue">
                      <i className="fas fa-edit"></i>
                    </button>
                  </p>)
        }
      case 'editName':
        if (edit === field) {
          return (<div>
            <b>Name</b>: <input name='inputName' onChange={this.handleChange} type="text" value={this.state.inputName} />{' '}
              <button name='editName' onClick={this.handleClick} className="btn-flat btn-blue">
                Update
              </button>

            </div>);
        } else {
          return (<div>
            <p><b>Name</b>: {this.props.user.name || 'no data'}{' '}
              <button name='editName' onClick={this.handleClick} className="btn-flat btn-blue">
                <i className="fas fa-edit"></i>
              </button>
            </p>
            </div>);
        }

      case 'editUsername':
      if (edit === field) {
        return (<div>
          <p><b>Username</b>: <input name='inputUsername' onChange={this.handleChange} value={this.state.inputUsername} />{' '}
          <button name='editUsername' onClick={this.handleClick} className="btn-flat btn-blue">
            Update
          </button>
        </p>
        </div>);
      } else {
        return (<div>
          <p><b>Username</b>: {this.props.user.nickname || 'no data'}{' '}
          <button name='editUsername' onClick={this.handleClick} className="btn-flat btn-blue">
            <i className="fas fa-edit"></i>
          </button>
        </p>
        </div>);
      }
      case 'none':
        return (<div></div>);
      default:
        return (<div></div>)
    }
  }

  render() {
    return (
      <div>
      <div className='log-box'>
        <h1>Settings</h1>
        <br />
        <div className='g-box'>
        <h2><u>Account Information</u></h2>
        <br />
        <h3>Private</h3>
        {this.renderEdit('editEmail')}
        {this.renderEdit('editName')}
        {this.props.error ? null || <div>{this.props.error.name}<br /></div> : null}
        <br />
        <h3>Public</h3>
        {this.renderEdit('editUsername')}
        {this.props.error ? this.props.error.username : null}
        </div>
        <br />
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
    user: state.user,
    error: state.auth.errorMessage,
    responseError: state.response.responseError
  };
}


export default connect(mapStateToProps, actions)(requireAuth(Settings, '/login'));
