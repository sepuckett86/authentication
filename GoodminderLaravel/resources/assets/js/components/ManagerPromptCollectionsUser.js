import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

// This is the front-end of a database manager.
// How you interact and change the database.
class User extends React.Component {
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

  handleClick(event) {
    if (event.target.name === 'user') {
      this.setState({ display: 'user'})
    }
    if (event.target.name === 'other') {
      this.setState({ display: 'other'})
    }
    if (event.target.name === 'createNewCollection') {
      this.props.changeHomeDisplay('promptCollectionCreate')
    }
  }

  renderListGroup() {
    const user = this.props.storedPromptCollections.filter(collection =>
      collection.creator_id === this.props.user_id
    );
    return (
      user.map((collection, i) => {
          return (
        <div key={i} className="list-group alignL">
          <div
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
          <a className='btn-flat' onClick={ () => {
              this.props.getPromptCollection(
                collection.prompt_collection_id,
                ()=> {
                  this.props.setCurrentStoredPromptCollection(collection);
                  this.props.changeManagerDisplay('promptCollection');
                })
          }
          }>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{collection.collection} | {collection.publicFlag}</h5>
              <small className="text-muted">{collection.promptCount} prompts</small>
            </div>
            <p className="mb-1">
            {collection.description}
            </p>
            <div className="d-flex w-100 justify-content-between">
            <small className="text-muted">Updated 2018-11-15.</small>
            <small className="text-muted"><button className='btn-flat btn-blue'><i className="fas fa-eye-slash"></i></button>{' '}<button className='btn-flat btn-blue'><i className="fas fa-trash"></i></button></small>
            </div>
            </a>
          </div>
        </div>
      );
    })
    )
  }

  promptTableDisplayChange() {
    this.setState({promptTableDisplay: 'addPrompt'})
  }

  generateKey(index) {
    return `${ index }_${ new Date().getTime() }`;
  }

  render() {
    return(
      <div>
      <Link to='/'>
      <button name='createNewCollection' onClick={this.handleClick} className='btn btn-green'>Create New Collection</button>
      </Link>
        {this.renderListGroup()}
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    gminders: state.goodminders,
    prompts: state.prompts,
    collection: state.navigation.collection,
    storedPromptCollections: state.storedPromptCollections,
    user_id: state.user.backend.id
  }
}

export default connect(mapStateToProps, actions)(User);
