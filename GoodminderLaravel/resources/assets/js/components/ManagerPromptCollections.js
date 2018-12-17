import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import ListGroup from './ManagerPromptCollectionsListGroup';

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
    // Prompt Collections
    this.props.getCollections(() => {

    })
  }

  handleClick(event) {
    if (event.target.name === 'createNewCollection') {
      this.props.changeManagerDisplay('promptCollectionCreate')
    }
    if (event.target.name === 'findMorePrompts') {
      this.props.changeManagerDisplay('promptCollectionFind')
    }
  }

  promptTableDisplayChange() {
    this.setState({promptTableDisplay: 'addPrompt'})
  }

  generateKey(index) {
    return `${ index }_${ new Date().getTime() }`;
  }


  render() {
    return(
      <div >


        <div className="box">
        <div id="promptCollections">
          <h1>Manage Prompt Collections</h1>
          <p>Prompt collections are displayed during goodminder creation.</p>
          <hr />

          <button name='createNewCollection' onClick={this.handleClick} className='btn btn-green'>Create New Collection</button>

          {' '}

          <button name='findMorePrompts' onClick={this.handleClick} className='btn btn-green'>Find More Prompts</button>

          <hr/>
          <h3>Your Collections</h3>
          <ListGroup who='user'/>
          <hr/>
          <h3>Collections from Others</h3>
          <ListGroup who='other'/>
        </div>
        </div>

      </div>)
  }
}

function mapStateToProps(state) {
  return {
    gminders: state.goodminders,
    prompts: state.prompts,
    collection: state.navigation.collection,
  }
}

export default connect(mapStateToProps, actions)(PromptCollections);
