import React, { Component } from 'react';
import Footer from './Footer';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      inputFirst: '',
      inputLast: '',
      inputComment: '',
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    if (event.target.id === "emailAddress") {
      this.setState({inputEmail: event.target.value});
    }
    if (event.target.id === "firstName") {
      this.setState({inputFirst: event.target.value});
    }
    if (event.target.id === "lastName") {
      this.setState({inputLast: event.target.value});
    }
    if (event.target.id === "comment") {
      this.setState({inputComment: event.target.value});
    }
  }

  handleClick(event) {
    if (event.target.id === 'submitContact') {
      this.props.postContact(this.state.inputEmail, this.state.inputFirst,
        this.state.inputLast, this.state.inputComment, ()=>{
          this.setState({
            submitted: true
          })
        });
      const contact = {
        email: this.state.inputEmail,
        firstName: this.state.inputFirst,
        lastName: this.state.inputLast,
        comment: this.state.inputComment
      }
      console.log(contact);
    }
  }

  render() {
    return (
      <main>
  	<div className="bgimg-2 parallax">
  	<div className="caption">
  		<span className="border comfortaa">Contact</span>
  	</div>
  	</div>
  	<div className="opaque-container">
    <div className="container">
  		<br /><br />
      <h4>Want to reach us? Do you have questions, comments, suggestions, or donations? Let us know here.</h4>

      <br />
      <hr />
      <br />
      <h2>Comment Form</h2>
      <br />
      { !this.state.submitted ?
  			 <div id="contact" className="box alignL">
  			<form>
  				<div className="form-group">

            <label htmlFor="exampleFormControlInput1">Email address:</label>
  					<input id="emailAddress" value={this.state.inputEmail} onChange={this.handleChange} type="email" className="form-control" placeholder="name@example.com" name="email"/>
  					<br />
  				<label htmlFor="firstname">Name: </label><br />
  				<div className="row">
  						<div className="col">
  							<input id='firstName' value={this.state.inputFirst} onChange={this.handleChange} type="text" className="form-control" placeholder="First" name="firstName"/>
  						</div>
  						<div className="col">
  							<input id='lastName' value={this.state.inputLast} onChange={this.handleChange} type="text" className="form-control" placeholder="Last" name="lastName"/>
  						</div>
  				</div>
  				<br />
  				<label htmlFor="exampleFormControlTextarea1">What would you like to say?</label>
  				<textarea id="comment" value={this.state.inputComment} onChange={this.handleChange} className="form-control" rows="3" name="comment"></textarea>

        </div>

        </form>
        <div style={{'textAlign': 'center'}}>
        	<button id='submitContact' className="btn btn-green" onClick={this.handleClick} name="btn-faq">Submit Comment</button>
        </div>
        </div>
        : <p>Comment successfully submitted!</p>}
        <br />
        <hr />
        <br />
        <h2>Donation Link</h2>
        <a href="https://www.paypal.me/goodminder" className='btn btn-green'>Link to our Paypal</a>
        <br /><br />
        </div>

  <br /><br />
</div>
<Footer />
  </main>

    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.errorMessage
  }
}
export default connect(mapStateToProps, actions)(Contact);
