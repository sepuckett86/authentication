import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import requireAuth from './auth/requireAuth';

import Goodminders from './Goodminders';
import Add from './Add';
import Print from './Print';

class Home extends Component {
  renderDisplay() {
    switch(this.props.display) {
      case 'add':
        return <Add />;
      case 'goodminders':
        return <Goodminders />;
      case 'print':
        return <Print />;
      default:
        return <Goodminders />;
      }
  }
  render() {
    return (
      <div>
        {this.renderDisplay()}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { display : state.display.home}
}
export default connect(mapStateToProps, actions)(requireAuth(Home, '/intro'));
