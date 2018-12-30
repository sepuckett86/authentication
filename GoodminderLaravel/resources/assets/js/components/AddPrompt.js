import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import ReactTooltip from 'react-tooltip';

import Loading from './Loading';

class AddPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputAnswer: '',
      inputReason: '',
      inputCollection: '',
      random: 'no',

    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changePrompt = this.changePrompt.bind(this);
    this.changePromptSame = this.changePromptSame.bind(this);
  }

  componentDidMount() {
    this.props.clearResponse();
    // Get data from database
      this.props.getPrompts(() => {
        // Check if there is data in prompts
        if (this.props.prompts.length !== 0 && !this.props.currentPrompt.id) {
          this.changePrompt();
        } else if (this.props.currentPrompt === {}) {
            this.props.setCurrentPrompt({promptText: 'No prompt available'});
        }
      });
  }

  changePrompt() {
    let random = this.props.prompts[Math.floor(Math.random() * this.props.prompts.length)];
    // Only perform get request if needed
    if (this.props.currentPrompt.creator_id !== random.creator_id) {
      this.props.getNickname(random.creator_id, () => {
        this.props.setCurrentPrompt(random);
      })
    } else {
      this.props.setCurrentPrompt(random);
    }
  }

  changePromptSame() {
    let collectionArray = [];
    this.props.prompts.forEach(prompt => {
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

  generateId() {
    return `${new Date().getTime()}`;
  }

  newGminder() {
    const newGminder = {
      category: 'prompt',
      mainResponse: this.state.inputAnswer,
      author: null,
      prompt_id: this.props.currentPrompt.id,
      reason: this.state.inputReason,
      source: null,
      who: null,
      rating: 0,
      collection: this.state.inputCollection,
      publicFlag: 0
    }
    console.log(newGminder)
    return newGminder;
  }

  render() {
    const style = {
      fontSize: '24px',
      color: '#2b2b2b', /* Blackish */
      paddingTop: '5%',
      paddingBottom: '5%',
      paddingRight: '2%',
      paddingLeft: '2%'
    }
    return (<div>

      <hr />
      <div className="prompt-grid-box">
        <div className="grid-upper-left">
        <div>
          <button id='next-prompt-same' data-tip="Next prompt from same collection" type="button" className="btn-flat btn-blue" onClick={this.handleClick}><i className="fas fa-long-arrow-alt-right"></i></button>{" "}|{" "}

          <button id='next-prompt-all' data-tip="Next prompt from any collection" type="button" className="btn-flat btn-blue" onClick={this.handleClick}><i className="fas fa-random"></i></button>{" "}|{" "}
          <button id="btnGroupDrop1" data-tip="More options" type="button" className="btn-flat btn-blue" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-ellipsis-h"></i>
          </button>

          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <Link to='/manager' onClick={() => {
            this.props.setCurrentPrompt({});
            this.props.changeManagerDisplay('promptCreateEdit')}}
            className="dropdown-item btn-dropdown">
            Create New Prompt
          </Link>
          <Link to='/manager' onClick={() => this.props.changeManagerDisplay('promptTable')} className="dropdown-item">
            View Prompts
          </Link>
          <Link to='/manager' onClick={() => this.props.changeManagerDisplay('promptCollections')} className="dropdown-item">
            Manage Prompt Collections
          </Link>
          <Link to='/manager' onClick={() => this.props.changeManagerDisplay('promptCollections')} className="dropdown-item">
            Find More Prompts
          </Link>
          </div>
        </div>
        </div>

      <div className="grid-upper-right header-text">

      <div>
      { this.props.currentPrompt.creator_id === this.props.user_id ?
        (<div>
          <button type="button" onClick={this.handleClick} data-tip="You wrote this prompt" className="btn-flat btn-blue">{this.props.user_name}</button>
        </div>) :
        <div><button className="btn-flat btn-blue">{this.props.nickname}</button>
        { this.props.nickname && this.props.currentPrompt.collection ? <div>{" "}|{" "}</div> : null }

        <button className="btn-flat btn-blue">{this.props.currentPrompt.collection}</button></div> }
      </div>
      </div>
      {this.props.currentPrompt.promptText ?
        (<div className="grid-center paragraph-text" style={style}>
        {this.props.currentPrompt.promptText}  </div> ): <div className="grid-center">
        {Object.keys(this.props.responseError).length !== 0 ? 'Could not retrieve prompts from server' :
          <div><Loading /></div>

      }
        </div>}
      <div className="grid-lower-left">
        <div>
        {/*<button type="button" className="btn-flat btn-blue"><i className="fas fa-plus"></i></button>*/}
        </div>
      </div>
      <div className="grid-lower-right">
        <div>
        {/*<button type="button" className="btn-flat btn-blue"><i className="fas fa-edit"></i></button>*/}
        </div>
      </div>
      </div>
      <br />
      <form>
        <div className="form-group" style={{'margin': '1%'}}>

          <textarea className="form-control" name='inputAnswer' value={this.state.inputAnswer} onChange={this.handleChange} id="prompt-answer" rows="3"></textarea>
          <br/>

          <p>
            <button className="btn btn-green" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              View more fields (optional)
            </button>
          </p>
          <div className="collapse" id="collapseExample">
          <p className="paragraph-text">Reason for your answer</p>
          <textarea className="form-control" name='inputReason' value={this.state.inputReason} onChange={this.handleChange} id="prompt-reason" rows="3"></textarea>
          <br/>

            <div className="form-group">
                <label>Collection</label>
                <input type="text" value={this.state.inputCollection}
                  onChange={this.handleChange} className="form-control"
                  name="inputCollection" />
            </div>
            <br />
          </div>
          {/*
          */}
        </div>

      </form>
      {/* Button trigger modal */}
      <button id="create-goodminder" type="button" className="btn btn-green" data-toggle="modal" onClick={this.handleClick} data-target="#exampleModal">
        Create Goodminder
      </button>

      <ReactTooltip delayShow={200}/>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    prompts: state.prompts,
    currentPrompt: state.navigation.currentPrompt,
    nickname: state.navigation.nickname,
    responseError: state.response.responseError,
    user_id: state.user.backend.id,
    user_name: state.user.name
   }
}

export default connect(mapStateToProps, actions)(AddPrompt);
