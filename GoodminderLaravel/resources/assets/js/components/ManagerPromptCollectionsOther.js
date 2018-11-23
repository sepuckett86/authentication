import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

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

  renderListGroup() {
    return (
      <div className="list-group alignL">
        <a
          href="#"
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Become Interesting | <a href='#'>user29</a></h5>
            <small className="text-muted">30 prompts</small>
          </div>
          <p className="mb-1">
            Want to be inspired about conversation topics? Want to improve your small talk? This is the collection for you.
          </p>
          <div className="d-flex w-100 justify-content-between">
          <small className="text-muted">Updated 2018-11-15.</small>
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
      <button>Find More Prompts</button>
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

export default connect(mapStateToProps, actions)(Other);
