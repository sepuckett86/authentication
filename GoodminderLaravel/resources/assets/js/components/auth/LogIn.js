import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Our component just got rendered
  componentDidMount() {
    this.shouldNavigateAway();
  }

  // Our component just got updated
  componentDidUpdate() {
    this.shouldNavigateAway();
  }

  shouldNavigateAway() {
    if (this.props.auth) {
      this.props.history.push('/');
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    // prevent standard form submit behaviour
    event.preventDefault();
      // API_request action
      this.props.updateUser(this.state.email, '');
      this.props.postLogin(this.state.email, this.state.password);

  }
  render() {
    return (
      <main>
      <div>
        { !this.props.auth ?
        <div className="log-box" >
        <h1>Log In</h1>
        <br />
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group row">
				    <label className="col-sm-2 col-form-label" htmlFor="exampleInputEmail1">Email</label>
						<div className="col-sm-10">
						<input name="email" onChange={this.handleChange} type="email" className="form-control" id="exampleInputEmail1" placeholder="user@example.com" required/>
					</div>
					</div>

				  <div className="form-group row">
				    <label className="col-sm-2 col-form-label" htmlFor="exampleInputPassword1">Password</label>
						<div className="col-sm-10">
						<input name="password" onChange={this.handleChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="**********" required/>
				  </div></div>
          <br />
				  <button type="submit"  className="btn btn-primary" name="btn-login">Submit</button>
				</form>
        <div >
          <br />
          <hr />
        <p>First time here? {' '}
          <Link to='/signup' className='btn btn-goodminder btn-sm'>
            <i className="fas fa-arrow-circle-right" ></i>{' '}Sign Up
          </Link>
        </p>
				<p>Forget your password? {' '}
          <Link to='/resetbegin' className='btn btn-goodminder btn-sm'>
            <i className="fas fa-arrow-circle-right"></i>{' '}Reset Password
          </Link>
        </p>
				</div>
        </div>
        : null }

			</div>
      <br /><br />
	   </main>
    )
  }
};

function mapStateToProps(state) {
  return { auth: state.auth.authenticated }
}

export default connect(mapStateToProps, actions)(LogIn);
