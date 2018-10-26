import React, { Component } from 'react';
import Footer from './Footer';


class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      inputFirst: '',
      inputLast: '',
      inputComment: ''
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
      const contact = {
        email: this.state.inputEmail,
        first: this.state.inputFirst,
        last: this.state.inputLast,
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
  		<br />

      <br />
      <h2>Have a question? </h2> <h2>Want to comment, make a suggestion, or donate?</h2>
      <br />
  			 <div id="contact" className="box">
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

        	<button id='submitContact' className="btn btn-small" onClick={this.handleClick} name="btn-faq">Submit</button>
        </div>
        </div>
  <br /><br />
</div>
<Footer />
  </main>

    );
  }
}

export default Contact;
