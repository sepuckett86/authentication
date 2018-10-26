import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export default (ChildComponent, route) => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push(route);
      }
    }

    render () {
      return <ChildComponent {...this.props}/>;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated }
  }

  return connect(mapStateToProps, actions)(ComposedComponent);
};
