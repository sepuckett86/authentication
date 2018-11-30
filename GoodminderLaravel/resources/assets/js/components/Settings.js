import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import requireAuth from './auth/requireAuth';
import { Link } from 'react-router-dom';

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

  }
  handleClick(e) {
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
    // Make requests to backend to change data
    switch(e.currentTarget.name) {
      case 'editName':
        // call to backend to change name
        break;
      case 'editUsername':
      // call to backend to change name
        break;
      default:
        break;
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
        <br />
        <h3>Public</h3>
        {this.renderEdit('editUsername')}
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
    user: state.user
  };
}


export default connect(mapStateToProps, actions)(requireAuth(Settings, '/login'));
