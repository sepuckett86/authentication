import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import requireAuth from './requireAuth';
import { Link } from 'react-router-dom';

const emojiRegex = require('emoji-regex');

// This is for a user who has their old password and wants to reset it

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      password: '',
      password_again: '',
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    // prevent standard form submit behaviour
    event.preventDefault();
    const password = this.state.password;
    let passwordFails = [];
    // this.passTest((password.length < 8), 'Password too short', passwordFails);
    this.passTest((password.length > 20), 'Password too long', passwordFails);
    this.passTest((password !== this.state.password_again), 'Passwords do not match', passwordFails);
    this.passTest((password.match(emojiRegex()) !== null), 'Emoji not accepted in password', passwordFails);
    this.passTest((password.indexOf('\'') >= 0), 'Single quotation marks are not accepted in password', passwordFails);
    this.passTest((password.indexOf('"') >= 0), 'Double quotation marks are not accepted in password', passwordFails);
    this.passTest((password.indexOf(' ') >= 0), 'Spaces are not accepted in password', passwordFails);
    // If there are no error messages
    if (passwordFails.length === 0) {
      // API_request action
      this.props.postPassword(
        this.state.oldPassword,
        this.state.password,
        this.state.password_again,
        () => {
        this.setState({submitted: true});
      });

    } else {
      alert(passwordFails.join('\n'));
    }
  }

  passTest(test, message, arr) {
    if (test)
      arr.push(message);
    return arr;
  }

  render() {
    return (
      <main>
      {console.log(this.state)}
	<div className="log-box">
			 <h1>Reset Password</h1>

            <p>Please enter your new password for {this.props.user.email}</p>
						<form id="needs-validation" noValidate>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Old Password</label>
                <div className="col-sm-10">
                  <input name='oldPassword' type="password" onChange={this.handleChange} className="form-control" id="inputOldPassword" placeholder="********" required/>
                </div>
              </div>
							<div className="form-group row">
								<label htmlFor="inputPassword" className="col-sm-2 col-form-label">New Password</label>
								<div className="col-sm-10">
									<input name='password' type="password" onChange={this.handleChange} className="form-control" id="inputPassword" aria-describedby="passwordHelpBlock" placeholder="********" required/>
									<small id="passwordHelpBlock" className="form-text text-muted">
									Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
									</small>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="inputPassword2" className="col-sm-2 col-form-label">Re-Type New Password</label>
								<div className="col-sm-10">
									<input name='password_again' type="password" onChange={this.handleChange} className="form-control" id="inputPassword2" placeholder="********" required/>
								</div>
							</div>
							<div className="form-group row" style={{'textAlign': 'center'}}>
								<div className="col-sm-12">
									<button type="submit" onClick={this.handleSubmit} className="btn btn-green">Submit</button>
								</div>
							</div>
						</form>

    </div>

</main>
    )
  }
};

function mapStateToProps(state) {
  return {
    user: state.user,
    token: state.auth.authenticated
   }
}

export default connect(mapStateToProps, actions)(requireAuth(Reset, '/intro'));
