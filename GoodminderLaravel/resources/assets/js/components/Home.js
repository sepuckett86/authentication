import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import requireAuth from './auth/requireAuth';

import Goodminders from './Goodminders';
import Add from './Add';
import Print from './Print';
import Edit from './Edit';
import More from './More';
import Pdf from './PDF';
import PromptCreateEdit from './PromptCreateEdit';
import PromptCollectionFind from './PromptCollectionFind';
import PromptCollectionView from './PromptCollectionView';
import PromptCollectionCreate from './PromptCollectionCreate';

class Home extends Component {
  componentDidMount() {
    // required to change navbar upon token inactivation
    this.props.getUser();
  }
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
      case 'more':
        return <More />;
      case 'pdf':
        return <Pdf />;
      case 'promptCreateEdit':
        return <PromptCreateEdit />;
      case 'promptCollectionCreate':
        return <PromptCollectionCreate />;
      case 'promptCollectionFind':
        return <PromptCollectionFind />;
      case 'promptCollectionView':
        return <PromptCollectionView />;
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
