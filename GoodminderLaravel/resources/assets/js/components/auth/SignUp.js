import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Link} from 'react-router-dom';

const emojiRegex = require('emoji-regex');

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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

  passTest(test, message, arr) {
    if (test)
      arr.push(message);
    return arr;
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
      this.props.postSignup(this.state.email, this.state.password);
      this.setState({submitted: true})
    } else {
      alert(passwordFails.join('\n'));
    }
  }
  render() {
    return (<main>
      {
        !this.state.submitted
          ? <div className="log-box">
              <h1>Create New Account</h1>
              <br/>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email address</label>
                  <div className="col-sm-10">
                    <input name="email" onChange={this.handleChange} type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="example@awesome.com" required="required"/>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <input name="password" onChange={this.handleChange} type="password" className="form-control" id="inputPassword" aria-describedby="passwordHelpBlock" placeholder="********" required="required"/>
                    <small id="passwordHelpBlock" className="form-text text-muted">
                      Your password must be 8-20 characters long, and may not contain spaces, quotes, or emoji.
                    </small>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword2" className="col-sm-2 col-form-label">Re-Type Password</label>
                  <div className="col-sm-10">
                    <input name="password_again" onChange={this.handleChange} type="password" className="form-control" id="inputPassword2" placeholder="********" required="required"/>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" id="btn-signup" name="btn-signup">Submit</button>
              </form>
              <div >
                <br/>
                <hr/>
                <p>Already have an account? {' '}
                  <Link to='/login' className='btn btn-goodminder btn-sm'>
                    <i className="fas fa-arrow-circle-right"></i>{' '}Log In
                  </Link>
                </p>
              </div>
            </div>
          : <div className='log-box'>Check your email to activate your account!</div>
      }
      <br/>
      <br/>
    </main>)
  }
};

export default connect(null, actions)(SignUp);
