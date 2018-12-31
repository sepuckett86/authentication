import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';
import {Link} from "react-router-dom";

// This is the front-end of a database manager.
// How you interact and change the database.
class PromptCollectionFind extends React.Component {

  componentDidMount() {
    // Get data from database
    // Prompt Collections
    this.props.getPromptCollections(() => {
      this.props.getCollections(()=>{})
    })
  }

  isCollectionAlreadyStored(collectionID) {

      const filtered = this.props.storedCollections.filter(collection =>
        collection.prompt_collection_id === collectionID
      )
      if (filtered.length > 0) {
        return true
      } else {
        return false
      }

  }

  renderListGroup() {
    const other = this.props.promptCollections.filter(collection =>
      collection.creator_id !== this.props.user_id
    );
    return (
      other.map((collection, i) => {
          return (
        <div key={i} style={{'cursor': 'pointer'}} className="list-group alignL">
          <div
            className="list-group-item list-group-item-action flex-column align-items-start"
          >

          <div className='btn-flat' onClick={ () => {
              this.props.getPromptCollection(
                collection.id,
                ()=> {
                  this.props.setCurrentPromptCollection(collection);
                  this.props.changeManagerDisplay('promptCollectionView');
                })
          }
          }>

            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{collection.collection} | {collection.nickname}</h5>

              <small className="text-muted">


                {collection.prompt_ids.length}{' '}
              {collection.prompt_ids.length === 1 ? <span>prompt</span> : <span>prompts</span>}

              </small>
            </div>
            <p className="mb-1">
            {collection.description}
            </p>

            <div className="d-flex w-100 justify-content-between">
            <small className="text-muted">
            Created{' '}
            {
              collection.created_at.split(' ')[0]
            }
            </small>

            <small className="text-muted">
            { this.isCollectionAlreadyStored(collection.id) === false ?
              null
            : <span><i>This collection is already in your stored collections.</i></span>}
            </small>
            </div>
          </div>

          </div>
        </div>
      );
    })
    )
  }

  generateKey(index) {
    return `${ index }_${ new Date().getTime() }`;
  }

  render() {
    return(
      <div >
      <br />
      <div className="box">
      <h3>Collections from Others</h3>
      {this.renderListGroup()}
      <br />
      </div>
      <br />
      <button
      id='random'
      name="Back"
      className='btn btn-custom'
      onClick={() => this.props.changeManagerDisplay('promptCollections')}>
      Back to Prompt Collections</button>
      <br />
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    gminders: state.goodminders,
    prompts: state.prompts,
    user_id: state.user.backend.id,
    promptCollections: state.promptCollections,
    storedCollections: state.storedPromptCollections
  }
}

export default connect(mapStateToProps, actions)(PromptCollectionFind);
