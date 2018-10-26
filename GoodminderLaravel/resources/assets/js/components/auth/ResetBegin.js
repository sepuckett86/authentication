import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class ResetBegin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
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
    // API_request action
    this.props.postReset(this.state.email);
  }
  render() {
    return (<main>
      <div className="log-box">
        <h1>Reset Password</h1>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <p>Please enter your email and click submit. You'll get a link in your email inbox allowing you to reset your password.</p>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="exampleInputEmail1">Email address</label>
            <div className="col-sm-10">
              <input name="email" onChange={this.handleChange} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" required="required"/>
            </div>
          </div>
          <br/>
          <button className="btn btn-primary" type="submit" name="btn-submit">Submit</button>
        </form>
      </div>

    </main>)
  }
};

export default connect(null, actions)(ResetBegin);
