import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Loading extends Component {

  render() {
    return (

      <div className='loading-box'>
        <br />
        <h1><i className="fas fa-spinner"></i>{' '}Loading{' '}<i className="fas fa-spinner"></i></h1>
        <br />
      </div>

    )
  }
};

function mapStateToProps(state) {
  return {

  };
}


export default connect(mapStateToProps, actions)(Loading);
