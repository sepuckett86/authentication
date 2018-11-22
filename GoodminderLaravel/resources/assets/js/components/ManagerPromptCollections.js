import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

// This is the front-end of a database manager.
// How you interact and change the database.
class PromptCollections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promptsShowing: [],
      sortBy: 'id',
      promptTableDisplay: 'promptTable',
      display: 'none'
    };
    // props
    this.changeDisplay = this.props.changeDisplay;

    // bind methods
    this.handleClick = this.handleClick.bind(this);
    this.promptTableDisplayChange = this.promptTableDisplayChange.bind(this);
  }

  componentDidMount() {
    // Get data from database
    // Prompts
    this.props.getPrompts(() => {
    })
  }

  handleClick(event) {
    if (event.target.name === 'user') {
      this.setState({ display: 'user'})
    }
    if (event.target.name === 'other') {
      this.setState({ display: 'other'})
    }
  }

  promptTableDisplayChange() {
    this.setState({promptTableDisplay: 'addPrompt'})
  }

  generateKey(index) {
    return `${ index }_${ new Date().getTime() }`;
  }

  chooseType() {
    if(this.state.display === 'none') {
      return(<div>
        <div className='row'>
        <div className='col'>
          <button name="user" className='btn-green btn' style={{'width':'100%'}} onClick={this.handleClick}>
            User
          </button>
        </div>
        <div className='col'>
          <button name="other" className='btn-green btn' style={{'width':'100%'}} onClick={this.handleClick}>
            Others
          </button>
        </div>
        </div>
      </div>)
    }
    if(this.state.display === 'user') {
      return(<div>
        <div className='row'>
        <div className='col'>
          <button name="user" className='btn-black btn' style={{'width':'100%'}} onClick={this.handleClick}>
            User
          </button>
        </div>
        <div className='col'>
          <button name="other" className='btn-green btn' style={{'width':'100%'}} onClick={this.handleClick}>
            Others
          </button>
        </div>
        </div>
      </div>)
    }
    if(this.state.display === 'other') {
      return(<div>
        <div className='row'>
        <div className='col'>
          <button name="user" className='btn-green btn' style={{'width':'100%'}} onClick={this.handleClick}>
            User
          </button>
        </div>
        <div className='col'>
          <button name="other" className='btn-black btn' style={{'width':'100%'}} onClick={this.handleClick}>
            Others
          </button>
        </div>
        </div>
      </div>)
    }
  }
  render() {
    return(
      <div className="container">

        <div className="box">
        <div id="promptCollections">
          <h1>Manage Prompt Collections</h1>
          <p>Here is where you can manage your own prompt collections or the display of other users' prompt collections</p>
          <hr />
          {this.chooseType()}
        </div>
        </div>

        <br />
        <br />

      </div>)
  }
}

function mapStateToProps(state) {
  return {
    gminders: state.goodminders,
    prompts: state.prompts,
    collection: state.navigation.collection
  }
}

export default connect(mapStateToProps, actions)(PromptCollections);
