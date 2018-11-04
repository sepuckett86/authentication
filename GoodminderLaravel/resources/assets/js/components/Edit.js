import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import EditPrompt from './EditPrompt';
import EditQuote from './EditQuote';
import EditCustom from './EditCustom';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.changeDatabase = this.changeDatabase.bind(this);
    this.setGminderforDatabase = this.setGminderforDatabase.bind(this);
  }

  changeDatabase(event) {
    if (event.target.id === 'deleteModal') {
      console.log(this.props.gminder);
      this.props.deleteGoodminder(this.props.gminder.id, this.props.goodminders, () => {
          this.props.changeHomeDisplay('random');
      })
    }
    if (event.target.id === 'editModal') {
      console.log(this.props.gminder);
      this.props.putGoodminder(this.props.updatedGminder, this.props.goodminders, () => {
        this.props.changeHomeDisplay('random');
      })
    }
  }

  setDisplay() {
    if (this.props.gminder.category === 'prompt') {
      return (<div>
        <EditPrompt/>
      </div>)
    }
    if (this.props.gminder.category === 'quote') {
      return (<div>
        <EditQuote/>
      </div>)
    }
    if (this.props.gminder.category === 'custom') {
      return (<div>
        <EditCustom/>
      </div>)
    } else {
      return (<div>
        <p>No category</p>
        <EditCustom/>
      </div>)
    }
  }

  render() {
    return(
      <div>
        {/* Modals */}
        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete Goodminder</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Make permanent change to database?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id='deleteModal' type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.changeDatabase}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Update Goodminder</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Make permanent change to database?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id='editModal' type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.changeDatabase}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
        {/* End Modal */}

        <br />
        <div className="container">
          <div className="box">
          <h1>Edit Goodminder</h1>
        {this.setDisplay()}
        {/* Button trigger modal */}
        <button type="button" className="btn btn-small" data-toggle="modal" data-target="#deleteModal">
          Delete Goodminder
        </button>
        </div>
        <br />
        <br />
        <br />
        <button
        onClick={() => this.props.changeHomeDisplay('goodminders')}>
        Back
        </button>
        </div>
      </div>
  )
}
}

funtion mapStateToProps(state) {
  return {
    gminder: state.navigation.currentGM,
    goodminders: state.goodminders,
    updatedGminder: state.navigation.updatedGM
   }
}
export default connect(mapStateToProps, actions)(Edit);
