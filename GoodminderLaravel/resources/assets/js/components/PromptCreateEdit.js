// Note: modal cannot be inside responsive design display or it will not work for all screen sizes
import { connect } from 'react-redux';
import * as actions from '../actions';

import React from 'react';

import MediaQuery from 'react-responsive';

class PromptCreateEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPrompt: '' || this.props.currentPrompt.promptText
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    const prompt = this.newPrompt();
    if (event.target.name === 'confirm') {
      if (this.props.currentPrompt.id) {
        this.props.putPrompt(prompt, () => {
          this.props.getPrompts();
          this.props.changeHomeDisplay('goodminders');
        })
      }
      if (!this.props.currentPrompt.id) {
        this.props.postPrompt(prompt, () => {
          this.props.getPrompts();
          this.props.changeHomeDisplay('goodminders');
        })
      }
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
                <h5 className="modal-title" id="exampleModalLabel">Create/Edit Prompt</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Make permanent change to database?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" name='confirm' data-dismiss="modal" onClick={this.handleClick}>Confirm</button>
              </div>
            </div>
          </div>
        </div>


          <br />

          <div className="box">
          <form>
              <div className="form-group">
                  <label>Create/Edit Prompt</label>
                  <textarea className="form-control" name='inputPrompt' value={this.state.inputPrompt} onChange={this.handleChange} rows="3"></textarea>
              </div>
          </form>
          {/* Button trigger modal */}
          <button id="update-goodminder" type="button" className="btn btn-green" data-toggle="modal" onClick={this.handleClick} data-target="#editModal">
            Submit
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
export default connect(mapStateToProps, actions)(PromptCreateEdit);
