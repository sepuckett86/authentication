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

  }

  renderListGroup() {
    const other = this.props.storedPromptCollections.filter(collection =>
      collection.creator_id !== this.props.user_id
    );
    let otherHidden = [];
    let otherDisplayed = [];
    other.forEach(collection => {
      if (collection.displayFlag === 0) {
        otherHidden.push(collection);
      } else if (collection.displayFlag === 1) {
        otherDisplayed.push(collection);
      }
    })
    return (
      <div>
      {otherDisplayed.map((collection, i) => {
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
              <h5 className="mb-1">{collection.collection} | {collection.publicFlag === 0 ? <span>Private</span>: <span>Public</span>}</h5>
              <small className="text-muted">
              {collection.prompts ? <span>
                {collection.prompts.length}{' '}
                {collection.prompts.length === 1 ? <span>prompt</span> : <span>prompts</span>}
                </span> : null}</small>
            </div>
            <p className="mb-1">
            {collection.description}
            </p>
            <div className="d-flex w-100 justify-content-between">
            <small className="text-muted">Created{' '}
            {
              collection.created_at.split(' ')[0]
            }</small>
            <small className="text-muted">
            <span data-tip='Hide collection' onClick={(e) => {
              this.props.putCollection(collection.id, 0, ()=>{
                this.props.getCollections(()=>{})
              })
              e.stopPropagation();}}
              className='btn-flat btn-blue'><i className="fas fa-eye-slash"></i></span>
            {' '}
            {/* Button trigger modal */}
            <span data-tip='Delete collection' name='delete' data-toggle="modal" data-target="#editModal"
            onClick={(e) => {
              this.props.setPromptCollectionID(collection.prompt_collection_id);
              e.stopPropagation();}}
              className='btn-flat btn-blue'><i className="fas fa-trash"></i></span>
            </small>
            </div>
            </a>
          </div>
        </div>
      );
    })}

    {otherHidden.map((collection, i) => {
        return (
      <div key={i} className="list-group alignL">
        <div
          className="list-group-item list-group-item-action list-group-item-dark flex-column align-items-start"
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
            <h5 className="mb-1">{collection.collection} |{' '}
            {collection.publicFlag === 0 ? <span>Private</span>: <span>Public</span>}{' '}|{' '}
            <i>Hidden</i></h5>
            <small className="text-muted">
            {collection.prompts ? <span>
              {collection.prompts.length}{' '}
              {collection.prompts.length === 1 ? <span>prompt</span> : <span>prompts</span>}
              </span> : null}
            </small>
          </div>
          <p className="mb-1">
          {collection.description}
          </p>
          <div className="d-flex w-100 justify-content-between">
          <small className="text-muted">Created{' '}
          {
            collection.created_at.split(' ')[0]
          }</small>
          <small className="text-muted">
          <span data-tip='Show collection' onClick={(e) => {
            this.props.putCollection(collection.id, 1, ()=>{
              this.props.getCollections(()=>{})
            })
            e.stopPropagation();}}
            className='btn-flat btn-blue'><i className="fas fa-eye"></i></span>
          {' '}
          {/* Button trigger modal */}
          <span data-tip='Delete collection' name='delete' data-toggle="modal" data-target="#editModal"
          onClick={(e) => {
            this.props.setPromptCollectionID(collection.prompt_collection_id);
            e.stopPropagation();}}
            className='btn-flat btn-blue'><i className="fas fa-trash"></i></span>
          </small>
          </div>
          </a>
        </div>
      </div>
    );
  })}
    </div>
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
