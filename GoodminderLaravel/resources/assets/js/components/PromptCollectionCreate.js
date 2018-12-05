// Note: modal cannot be inside responsive design display or it will not work for all screen sizes
import { connect } from 'react-redux';
import * as actions from '../actions';

import React from 'react';

import MediaQuery from 'react-responsive';

class PromptCollectionCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPrompt: '' || this.props.currentPrompt.promptText
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    if (event.target.name === 'confirmCreate') {
      const prompt = this.newPrompt();
      this.props.postPrompt(prompt, () => {
        this.props.getPrompts(()=> {});
        this.props.changeHomeDisplay('goodminders');
      })
    }
    if (event.target.name === 'confirmChange') {
      const prompt = this.newPrompt();
      const id = this.props.currentPrompt.id;
      this.props.putPrompt(prompt, id, () => {
        this.props.getPrompts(()=> {});
        this.props.changeHomeDisplay('goodminders');
      })
    }
    if (event.target.name === 'confirmDelete') {
      const id = this.props.currentPrompt.id;
      this.props.deletePrompt(id, () => {
        this.props.getPrompts(()=> {});
        this.props.changeHomeDisplay('manager');
      })
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  newPrompt() {
    const newPrompt = {
      promptText: this.state.inputPrompt
    }
    return newPrompt;
  }

  render() {
    return(
      <div className="container">

        {/* Modal - Must be outside of responsive design displays */}
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Prompt</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Make permanent change to database?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" name='confirmChange' data-dismiss="modal" onClick={this.handleClick}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModal2" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete Prompt</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Make permanent change to database?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" name='confirmDelete' data-dismiss="modal" onClick={this.handleClick}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="createModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModal2" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create Prompt</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Make permanent change to database?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" name='confirmCreate' data-dismiss="modal" onClick={this.handleClick}>Confirm</button>
              </div>
            </div>
          </div>
        </div>


          <br />

          <div className="box">
          <h1>Create New Prompt Collection</h1>
          <form>
          <div className="form-group">
              <label>Title</label>
              <input type="text" value={this.state.inputTitle}
                onChange={this.handleChange} className="form-control"
                name="inputCollection" />
          </div>
              <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control" name='inputPrompt' value={this.state.inputPrompt} onChange={this.handleChange} rows="3"></textarea>
              </div>
          </form>
          {/* Button trigger modal */}
            <button type="button" className="btn btn-green" data-toggle="modal" data-target="#createModal">
              Create Prompt Collection
            </button>
          </div>

          {/* MediaQuery for small screen */}
          <MediaQuery query="(max-width: 576px)">
            <hr />
          </MediaQuery>

         <br />
         <div className="row">
           <div className="col">
        <button
        id='random'
        name="Back"
        className='btn btn-custom'
        onClick={() => this.props.changeHomeDisplay('goodminders')}>
        <i className="fas fa-home"></i>{' '}Back to Home</button>
        <br />

      <br />
    </div>
    <br />
        </div>

  </div>
  )
  }
}

function mapStateToProps(state) {
  return { currentPrompt: state.navigation.currentPrompt,
            }
}
export default connect(mapStateToProps, actions)(PromptCollectionCreate);
