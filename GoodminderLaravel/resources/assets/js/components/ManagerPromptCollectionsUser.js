import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

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
  }

  renderListGroup() {
    return (
      <div className="list-group alignL">
        <a
          href="#"
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Funny | <span style={{'color': 'blue'}}>Public</span></h5>
            <small className="text-muted">10 prompts</small>
          </div>
          <p className="mb-1">
            A collection for winners.
          </p>
          <div className="d-flex w-100 justify-content-between">
          <small className="text-muted">Created 2018-11-15. Modified 2018-11-15.</small>
          <small className="text-muted">Toggle. Delete.</small>
          </div>
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Funny | <span style={{'color': 'green'}}>Private</span></h5>
            <small className="text-muted">10 prompts</small>
          </div>
          <p className="mb-1">
            A collection for losers.
          </p>
          <div className="d-flex w-100 justify-content-between">
          <small className="text-muted">Created 2018-11-15. Modified 2018-11-15.</small>
          <small className="text-muted">Toggle. Delete.</small>
          </div>

        </a>
      </div>
    );
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
      <button>Create New Collection</button>
        {this.renderListGroup()}
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

export default connect(mapStateToProps, actions)(User);