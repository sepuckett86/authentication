// Note: modal cannot be inside responsive design display or it will not work for all screen sizes
import { connect } from 'react-redux';
import * as actions from '../actions';

import React from 'react';

import MediaQuery from 'react-responsive';

class PromptCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompts: this.props.collection.prompts
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    if (e.currentTarget.name === 'delete') {
      // Change this.state.prompts to new prompt array without the prompt
    }
  }

  generateKey(index) {
    return `${ index }_${ new Date().getTime() }`;
  }

  render() {
    return(
      <div className="container">

      {/* Modal - Must be outside of responsive design displays */}
      <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Delete Prompt from Collection</h5>
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

        <div className="box">
          <br />
          <table className="table table-striped" style={{'textAlign': 'left'}}>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Prompt</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
          {
            this.props.collection.prompts.map((prompt, i) => {
              return (
                  <tr key={this.generateKey(i)}>
                    <th scope="row">{i}</th>
                    <td>{prompt.promptText}</td>
                    <td>
                    <button type="button" name='delete' className="btn-flat btn-blue" data-toggle="modal" data-target="#deleteModal">
                      <i className="fas fa-trash"></i>
                    </button>
                    </td>
                  </tr>
              )
            })
          }
        </tbody>
        </table>
          <button
          className='btn btn-custom'
          onClick={() => this.props.changeHomeDisplay('goodminders')}>
          <i className="fas fa-home"></i>{' '}Back to Home</button>
          <br />
          <br />
        </div>
        <br />
      </div>
  )
  }
}

function mapStateToProps(state) {
  return { collection: state.navigation.currentPromptCollection
            }
}
export default connect(mapStateToProps, actions)(PromptCollection);
