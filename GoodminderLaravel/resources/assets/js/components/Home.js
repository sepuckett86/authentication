import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import requireAuth from './auth/requireAuth';

import Goodminders from './Goodminders';
import Add from './Add';
import Print from './Print';
import Edit from './Edit';
import Manager from './Manager';
import More from './More';
import PDF from './PDF';

class Home extends Component {
  renderDisplay() {
    switch(this.props.display) {
      case 'add':
        return <Add />;
      case 'goodminders':
        return <Goodminders />;
      case 'print':
        return <Print />;
      case 'edit':
        return <Edit />;
      case 'manager':
        return <Manager />;
      case 'more':
        return <More />;
      case 'pdf':
        return <PDF />;
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
  return {
    display : state.display.home,
    email: state.user.email,
    name: state.user.name
  }
}
export default connect(mapStateToProps, actions)(requireAuth(Home, '/intro'));
