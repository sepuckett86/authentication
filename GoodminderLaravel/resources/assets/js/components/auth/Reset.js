import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import requireAuth from './requireAuth';


class Reset extends Component {

  render() {
    return (
      <main>
	<div className="log-box">
			 <h1>Reset Password</h1>
            <p>Please enter your new password for "email address goes here"</p>
						<form id="needs-validation" noValidate>
							<div className="form-group row">
								<label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
								<div className="col-sm-10">
									<input type="password" className="form-control" id="inputPassword" aria-describedby="passwordHelpBlock" placeholder="********" required/>
									<small id="passwordHelpBlock" className="form-text text-muted">
									Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
									</small>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="inputPassword2" className="col-sm-2 col-form-label">Re-Type Password</label>
								<div className="col-sm-10">
									<input type="password" className="form-control" id="inputPassword2" placeholder="********" required/>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-10">
									<button type="submit" className="btn btn-primary">Submit</button>
								</div>
							</div>
						</form>
    </div>

</main>
    )
  }
};

export default connect(null, actions)(requireAuth(Reset, '/intro'));
