import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputAnswer: '',
      inputReason: '',
      random: 'no'
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changePrompt = this.changePrompt.bind(this);
    this.changePromptSame = this.changePromptSame.bind(this);
  }

  componentDidMount() {
    // Get data from database
      this.props.getPrompts(() => {
        // Check if there is data in prompts
        if (this.props.prompts.length !== 0) {
          this.changePrompt();
        } else {
          this.props.setCurrentPrompt({promptText: 'No prompt available', collection: 'none'});
        }
      });
  }

  changePrompt() {
    let random = this.props.prompts[Math.floor(Math.random() * this.props.prompts.length)];
    this.props.setCurrentPrompt(random);
  }

  changePromptSame() {
    let collectionArray = [];
    this.props.prompts.forEach(prompt => {
      console.log(prompt)
      if (prompt.collection === this.props.currentPrompt.collection) {
        collectionArray.push(prompt);
      }
    })
    let random = collectionArray[Math.floor(Math.random() * collectionArray.length)];
    this.props.setCurrentPrompt(random);
  }

  handleClick(event) {
    if (event.currentTarget.id === "next-prompt-all") {
      this.changePrompt();
    }
    if (event.currentTarget.id === "next-prompt-same") {
      this.changePromptSame();
    }
    if (event.target.id === "collection") {
      this.props.setCollection(this.props.currentPrompt.collection);
      this.props.changeDisplay('manager');
    }
    if (event.target.id === "create-goodminder") {
      const gminder = this.newGminder();
      this.props.setGminderForDatabase(gminder);
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
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
      category: 'prompt',
      mainResponse: this.state.inputAnswer,
      author: null,
      prompt_id: this.props.currentPrompt.id,
      reason: this.state.inputReason,
      source: null,
      who: null,
      rating: 0,
      eventDate: date,
      collection: this.props.currentPrompt.collection,
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
    const grey = {
      color: '#A3A3A3',
    }
    return (<div>

      <hr />
      {/* <p>Collection:
        <button id="collection" className="button-transparent" onClick={this.handleClick}>{this.props.currentPrompt.collection}</button>
      </p> */}
      <p className="paragraph-text">Prompt</p>
      <div className="prompt-grid-box">
        <div className="grid-upper-left">
        <div>
          <button type="button" className="btn button-transparent"><i className="fas fa-long-arrow-alt-right"></i></button>{" "}|{" "}

          <button type="button" className="btn button-transparent"><i className="fas fa-random"></i></button>{" "}|{" "}
          <button id="btnGroupDrop1" type="button" className="btn button-transparent" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-ellipsis-h"></i>
          </button>

          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a className="dropdown-item" href="#">Dropdown link</a>
            <a className="dropdown-item" href="#">Dropdown link</a>
          </div>
        </div>
        </div>

      <div className="grid-upper-right header-text">
      <div>
      <button className="btn button-transparent">{this.props.nickname}</button>{" "}|{" "}<button className="btn button-transparent">{this.props.currentPrompt.collection}</button>
      </div>
      </div>
      <div className="grid-center paragraph-text" style={style}>{this.props.currentPrompt.promptText}</div>
      <div className="grid-lower-left">
        <div>
        <button type="button" className="btn button-transparent"><i className="fas fa-plus"></i></button>
        </div>
      </div>
      <div className="grid-lower-right">
        <div>
        <button type="button" className="btn button-transparent"><i className="fas fa-edit"></i></button>
        </div>
      </div>
      </div>
      <br />
      <p className="paragraph-text">
      Next random prompt: <br />
      <button id="next-prompt-same" className="btn btn-small" onClick={this.handleClick}>
        <i className="fas fa-long-arrow-alt-right"></i>{' '}Collection: {this.props.currentPrompt.collection}</button>
      {' '}
      <button id="next-prompt-all" className="btn btn-small" onClick={this.handleClick}>
        <i className="fas fa-random"></i>{' '}All Collections</button>
      </p>
      <br />
      <form>
        <div className="form-group">
          <p className="paragraph-text">Answer</p>
          <textarea className="form-control" name='inputAnswer' value={this.state.inputAnswer} onChange={this.handleChange} id="prompt-answer" rows="3"></textarea>
          <br/>
          <p className="paragraph-text">Reason</p>
          <textarea className="form-control" name='inputReason' value={this.state.inputReason} onChange={this.handleChange} id="prompt-reason" rows="3"></textarea>
          <br/>
        </div>

      </form>
      {/* Button trigger modal */}
      <button id="create-goodminder" type="button" className="btn btn-small" data-toggle="modal" onClick={this.handleClick} data-target="#exampleModal">
        Create Goodminder
      </button>

    </div>)
  }
}

function mapStateToProps(state) {
  return {
    prompts: state.prompts,
    currentPrompt: state.navigation.currentPrompt,
    nickname: state.user.name
   }
}

export default connect(mapStateToProps, actions)(AddPrompt);
