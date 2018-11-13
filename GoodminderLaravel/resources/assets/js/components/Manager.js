import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import GminderTable from './ManagerGminderTable';
import PromptTable from './ManagerPromptTable';

// This is the front-end of a database manager.
// How you interact and change the database.
class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      managerDisplay: 'none'
    };

    // bind methods
    this.changeManagerDisplay = this.changeManagerDisplay.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  changeManagerDisplay(id) {
    this.setState({
      managerDisplay: id
    })
  }
  handleClick(event) {
    this.changeManagerDisplay(event.target.id);
  }

  renderManagerDisplay() {
    switch(this.state.managerDisplay) {
      case 'gminderTable':
        return (<div>
          <GminderTable/>
            <br />
          <button
          name="Table of All Prompts"
          id="promptTable"
          className='btn-custom btn'
          onClick={this.handleClick}
          >Table of All Prompts</button>
          <br />
          <button
          id='random'
          name="Back"
          className='btn btn-custom'
          onClick={() => this.props.changeHomeDisplay('goodminders')}>
          <i className="fas fa-home"></i>{' '}Back to Home</button>

          <br />
        </div>)
      case 'promptTable':
        return (<div>
          <PromptTable/>
          <button
          name="Table of All Gminders"
          onClick={this.handleClick}
          className='btn-custom btn'
          id="gminderTable"
          >Table of All Gminders</button>
          <br />
          <button
          id='random'
          name="Back"
          className='btn btn-custom'
          onClick={() => this.props.changeHomeDisplay('goodminders')}>
          <i className="fas fa-home"></i>{' '}Back to Home</button>

          <br />
        </div>)
      default:
        return (<div>
          <button
          name="Table of All Gminders"
          className='btn-custom btn'
          onClick={this.handleClick}
          id="gminderTable"
          >Table of All Gminders</button>
          <br />
          <button
          name="Table of All Prompts"
          className='btn-custom btn'
          id="promptTable"
          onClick={this.handleClick}
          >Table of All Prompts</button>
          <br />
          <button
          id='random'
          name="Back"
          className='btn btn-custom'
          onClick={() => this.props.changeHomeDisplay('goodminders')}>
          <i className="fas fa-home"></i>{' '}Back to Home</button>

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
  return {}
}
export default connect(mapStateToProps, actions)(Manager);
