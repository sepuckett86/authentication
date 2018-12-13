import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import requireAuth from './auth/requireAuth';
import { Link } from 'react-router-dom';

import GminderTable from './ManagerGminderTable';
import PromptTable from './ManagerPromptTable';
import PromptCollections from './ManagerPromptCollections';
import PromptCollection from './ManagerPromptCollection';
import PromptCollectionCreate from './ManagerPromptCollectionCreate';
import PromptCollectionFind from './ManagerPromptCollectionFind';
import PromptCollectionView from './ManagerPromptCollectionView';
import PromptCreateEdit from './ManagerPromptCreateEdit';


// This is the front-end of a database manager.
// How you interact and change the database.
class Manager extends React.Component {
  constructor(props) {
    super(props);

    // bind methods
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event) {
    this.props.changeManagerDisplay(event.target.id);
  }

  renderManagerDisplay() {
    switch(this.props.managerDisplay) {
      case 'gminderTable':
        return (<div>
          <GminderTable/>
            <br />

          <button
          name="Back"
          className='btn btn-custom'
          onClick={this.handleClick}>
          {' '}Back to Manage</button>

          <br />
        </div>)
      case 'promptTable':
        return (<div>
          <PromptTable/>
          <button
          name="Back"
          className='btn btn-custom'
          onClick={this.handleClick}>
          {' '}Back to Manage</button>
          <br />
        </div>)
      case 'promptCollection':
        return (<div>
          <PromptCollection/>
            <br />
          <button
          id='promptCollections'
          name="Back"
          className='btn btn-custom'
          onClick={this.handleClick}>
          {' '}Back to Prompt Collections</button>

          <br />
        </div>)
      case 'promptCollections':
        return (<div>
          <PromptCollections/>
            <br />
          <button
          name="Back"
          className='btn btn-custom'
          onClick={this.handleClick}>
          {' '}Back to Manage</button>
          <br />
        </div>)
      case 'promptCollectionCreate':
        return <PromptCollectionCreate/>
      case 'promptCollectionFind':
        return <PromptCollectionFind />;
      case 'promptCollectionView':
        return <PromptCollectionView />;
      case 'promptCreateEdit':
        return <PromptCreateEdit />;
      default:
        return (<div>
          <button
          name="Table of All Goodminders"
          className='btn-custom btn'
          onClick={this.handleClick}
          id="gminderTable"
          >Goodminders</button>
          <br />
          <button
          name="Table of All Prompts"
          className='btn-custom btn'
          id="promptTable"
          onClick={this.handleClick}
          >Prompts</button>
          <br />
          <button
          name=""
          className='btn-custom btn'
          id="promptCollections"
          onClick={this.handleClick}
          >Prompt Collections</button>
          <br />
          <Link to="/" >
          <button
          id='random'
          name="Back"
          className='btn btn-custom'
          onClick={() => {this.props.changeHomeDisplay('goodminders')}}>
          <i className="fas fa-home"></i>{' '}Back to Home</button></Link>
          <br />
        </div>)
    }
  }
  render() {
    return(
      <div className="container-fluid">
        <br />
        {this.renderManagerDisplay()}
        <br /><br />
      </div>)
  }
}
function mapStateToProps(state) {
  return {managerDisplay: state.display.manager}
}
export default connect(mapStateToProps, actions)(requireAuth(Manager, '/login'));;
