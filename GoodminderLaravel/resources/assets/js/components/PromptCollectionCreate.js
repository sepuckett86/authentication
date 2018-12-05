// Note: modal cannot be inside responsive design display or it will not work for all screen sizes
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

import React from 'react';

import MediaQuery from 'react-responsive';

class PromptCollectionCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTitle: '',
      inputDescription: '',
      promptsToAdd: [],
      promptsToChooseFrom: [],
      promptPages: 0,
      currentPage: 1
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getPrompts(()=>{
      this.setState({
        promptsToChooseFrom: this.props.prompts
      })
    })
  }

  handleClick(event) {
    if (event.target.name === 'confirmCreate') {
      const collection = this.createCollection();
      this.props.postPromptCollection(collection, () => {
        this.props.getPromptCollections(()=> {});
        this.props.changeManagerDisplay('promptCollections');
      })
    }
    if (event.target.name === 'togglePromptAdd') {

    }
    if (event.target.name === 'togglePromptRemove') {

    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  makePromptPages() {
    const numberOfPrompts = this.props.prompts.length;
    let numberOfPages;
    if (numberOfPrompts / 10 > 0) {
      if (numberOfPrompts % 10 !== 0) {
        numberOfPages = (numberOfPrompts / 10) + 1;
      } else if (numberOfPrompts % 10 === 0){
        numberOfPages = numberOfPrompts / 10
      }
    } else {
      numberOfPages = 1
    }
    return numberOfPages;
  }

  createCollection() {
    return {
      collection: this.state.inputCollection,
      description: this.state.inputDescription,
      publicFlag: 0,
      prompts: this.state.promptsToAdd
    }
  }

  generateKey(index) {
    return `${ index }_${ new Date().getTime() }`;
  }

  render() {
    return(
      <div className="container">

        {/* Modal - Must be outside of responsive design displays */}
        <div className="modal fade" id="createModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModal2" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create Prompt Collection</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Make permanent change to database?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <Link to='/manager'><button type="button" className="btn btn-primary" name='confirmCreate' data-dismiss="modal" onClick={this.handleClick}>Confirm</button></Link>
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
          { this.state.promptsToAdd.length !== 0 ?
          <div><ul className="list-group">
                    {
                      this.state.promptsToAdd.map((prompt, i) => {
                        return (
                            <li className='list-group-item list-group-item-action' name='togglePromptRemove' key={this.generateKey(i)}>
                              {prompt.promptText}</li>

                        )
                      })
                    }
                    </ul></div> : null }
<p>Click on Prompts to Add</p>
<ul className="list-group">
          {
            this.state.promptsToChooseFrom.map((prompt, i) => {
              return (
                  <li className='list-group-item list-group-item-action' name='togglePromptAdd' key={this.generateKey(i)}>
                    {prompt.promptText}</li>

              )
            })
          }
          </ul>

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
    prompts: state.prompts
            }
}
export default connect(mapStateToProps, actions)(PromptCollectionCreate);
