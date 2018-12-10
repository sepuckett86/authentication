import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';
import ReactTooltip from 'react-tooltip';

// This is the front-end of a database manager.
// How you interact and change the database.
class Other extends React.Component {
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
  }

  renderListGroup() {
    const other = this.props.storedPromptCollections.filter(collection =>
      collection.creator_id !== this.props.user_id
    );
    return (
      other.map((collection, i) => {
          return (
        <div key={i} style={{'cursor': 'pointer'}} className="list-group alignL">
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
              <h5 className="mb-1">{collection.collection} | {collection.creator_id}</h5>
              <small className="text-muted">
              {collection.prompts.length}{' '}
              {collection.prompts.length === 1 ? <span>prompt</span> : <span>prompts</span>}</small>
            </div>
            <p className="mb-1">
            {collection.description}
            </p>

            <div className="d-flex w-100 justify-content-between">
            <small className="text-muted">Updated 2018-11-15.</small>

            <small className="text-muted"><span data-tip='Hide collection' onClick={(e) => {console.log('clickeye'); e.stopPropagation();}} className='btn-flat btn-blue'><i name='eye' className="fas fa-eye-slash"></i></span>{' '}
            <span data-tip='Remove collection from stored collections' onClick={(e) => {console.log('clicktrash'); e.stopPropagation();}} className='btn-flat btn-blue'><i className="fas fa-trash"></i></span></small>
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
      <h3>Saved Collections from Others</h3>
      {this.renderListGroup()}
      <br />
      <ReactTooltip delayShow={200}/>
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

export default connect(mapStateToProps, actions)(Other);
