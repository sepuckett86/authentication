import React from 'react';
import StarsSimple from '../../../../Components/StarsSimple/StarsSimple';


class EditPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prompt: '',
      inputAnswer: this.props.gminder.mainResponse,
      inputReason: this.props.gminder.reason || '',
      inputRating: this.props.gminder.rating
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeRating = this.changeRating.bind(this);

  }

  componentDidMount() {

    // Assign prompt from promptID
      for (let i = 0; i < this.props.prompts.length; i++) {
        if (this.props.prompts[i].id === this.props.gminder.promptID) {
          const thePrompt = this.props.prompts[i];
          this.setState({prompt: thePrompt})
        }
      }
  }

  changeRating(stars) {
    this.setState({inputRating: stars})
  }


  handleClick(event) {
    if (event.target.id === "update-goodminder") {
      const gminder = this.newGminder();
      this.props.setGminderForDatabase(gminder);
    }
  }

  handleChange(event) {
    if (event.target.id === "prompt-answer") {
      this.setState({inputAnswer: event.target.value});
    }
    if (event.target.id === "prompt-reason") {
      this.setState({inputReason: event.target.value});
    }

  }

  getDate() {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    const fullDate = `${month}/${day}/${year}`;
    return fullDate;
  }

  generateId() {
    return `${new Date().getTime()}`;
  }

  newGminder() {
    const date = this.getDate();
    const newGminder = {
      id: this.props.gminder.id,
      userID: 1,
      category: 'prompt',
      mainResponse: this.state.inputAnswer,
      author: null,
      promptID: this.props.gminder.promptID,
      reason: this.state.inputReason,
      source: null,
      who: null,
      rating: this.state.inputRating,
      recordedDate: date,
      eventDate: null,
      updatedDate: null,
      collection: this.props.gminder.collection,
      publicFlag: 0
    }
    console.log(newGminder)
    return newGminder;
  }

  render() {
    const style = {
      fontSize: '24px',
      color: '#2b2b2b', /* Blackish */
    }
    return (<div>

      <hr />



<p className="lato">Prompt</p>
      <div className="g-box">
        <div className="large">

        <p className="lato" style={style}>{this.state.prompt.promptText}</p>
        </div>
      </div>
      <br />

      <br />
      <form>
        <div className="form-group">
          <p className="lato">Answer</p>
          <textarea className="form-control" value={this.state.inputAnswer} onChange={this.handleChange} id="prompt-answer" rows="3"></textarea>
          <br/>
          <p className="lato">Reason</p>
          <textarea className="form-control" value={this.state.inputReason} onChange={this.handleChange} id="prompt-reason" rows="3"></textarea>
          <br/>
        </div>

      </form>
      <StarsSimple
        gminder={this.props.gminder}
        changeRating={this.changeRating}
        stars={this.state.inputRating}
        />
        <br />
      {/* Button trigger modal */}
      <button id="update-goodminder" type="button" className="btn btn-small" data-toggle="modal" onClick={this.handleClick} data-target="#editModal">
        Update Goodminder
      </button>

    </div>)
  }
}

export default EditPrompt;
