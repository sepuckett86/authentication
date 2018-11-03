import React from 'react';
import Gminder from '../../../../Utils/Gminder'
import Button from '../../Components/Button/Button'

import EditPrompt from './Components/EditPrompt/EditPrompt';
import EditQuote from './Components/EditQuote/EditQuote';
import EditCustom from './Components/EditCustom/EditCustom';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedGminder: {}
    }
    this.changeDatabase = this.changeDatabase.bind(this);
    this.setGminderforDatabase = this.setGminderforDatabase.bind(this);
  }

  handleClick(event) {
    if (event.target.id === 'updateButton') {
    }
  }
  changeDatabase(event) {
    if (event.target.id === 'deleteModal') {
      console.log(this.props.gminder);
      Gminder.deleteGminder(this.props.gminder.id).then(() => {
        this.props.changeDisplay('random');
      });
    }
    if (event.target.id === 'editModal') {
      console.log(this.props.gminder);
      Gminder.updateGminder(this.state.updatedGminder).then(() => {
        this.props.changeDisplay('random');
      });
    }
  }

  setGminderforDatabase(gminder) {
    this.setState({updatedGminder: gminder})
  }

  setDisplay() {
    if (this.props.gminder.category === 'prompt') {
      return (<div>
        <EditPrompt
          gminder={this.props.gminder}
          prompts={this.props.prompts}
          setGminderForDatabase={this.setGminderforDatabase}/>
      </div>)
    }
    if (this.props.gminder.category === 'quote') {
      return (<div>
        <EditQuote
        gminder={this.props.gminder}
      setGminderForDatabase={this.setGminderforDatabase} />
      </div>)
    }
    if (this.props.gminder.category === 'custom') {
      return (<div>
        <EditCustom
        gminder={this.props.gminder}
      setGminderForDatabase={this.setGminderforDatabase} />
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
        <Button
          id='random'
        name="Back"
        onClick={this.props.changeDisplay}
        />
        </div>
      </div>
  )
}
}

export default Edit;
