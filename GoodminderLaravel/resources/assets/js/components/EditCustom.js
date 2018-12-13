import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MediaQuery from 'react-responsive';

import StarsSimple from './StarsSimple';
import EditInput from './EditInput';

class EditCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAnswer : this.props.gminder.mainResponse,
      inputCollection : this.props.gminder.collection || '',
      inputRating: this.props.gminder.rating,
      editAnswer: false,
      editCollection: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.closeEditBoxes = this.closeEditBoxes.bind(this);
  }

  closeEditBoxes() {
    this.setState({
      editAnswer: false,
      editCollection: false
    })
  }

  newGminder() {
    const newGminder = {
      id: this.props.gminder.id,
      mainResponse: this.state.inputAnswer,
      rating: this.state.inputRating,
      recordedDate: this.props.gminder.recordedDate,
      collection: this.state.inputCollection,
    }
    return newGminder;
  }

  handleClick(event) {
    if (event.target.id === "update-goodminder") {
        const gminder = this.newGminder();
        this.props.setUpdatedGM(gminder);
    }
    if (event.target.id === "editAnswer") {
      this.setState({
        editAnswer: !this.state.editAnswer
      })
    }
    if (event.target.id === "editCollection") {
      this.setState({
        editCollection: !this.state.editCollection
      })
    }
  }

  renderInput(type) {
    if (type === 'editAnswer') {
      if (this.state.editAnswer) {
        return(
          <EditInput
            closeEditBoxes={this.closeEditBoxes}
            type='editAnswer'
            inputAnswer={this.state.inputAnswer}
            handleChange={this.handleChange}
          />)
      } else {
        return <div><button id='editAnswer' onClick={this.handleClick} className='btn-editMe'>
        {this.state.inputAnswer ? this.state.inputAnswer : 'Add Main Response Here'}</button></div>
      }
    }
    if (type === 'editCollection') {
      if (this.state.editCollection) {
        return(<EditInput
          closeEditBoxes={this.closeEditBoxes}
          type='editCollection'
          inputCollection={this.state.inputCollection}
          handleChange={this.handleChange}
        />)
      } else {
        return (
          <span><button id='editCollection' onClick={this.handleClick} className='btn-editMe'>
          {this.state.inputCollection ? this.state.inputCollection : 'Add Collection Here' }
          </button></span>
        )
      }

    }
  }

  handleChange(event) {
    if (event.target.id === "custom-answer") {
      this.setState({inputAnswer: event.target.value});
    }
    if (event.target.id === "custom-collection") {
      this.setState({inputCollection: event.target.value});
    }
  }

  changeRating(stars) {
    this.setState({inputRating: stars})
  }

  render() {
    const date = this.props.gminder.date;

    const rows = this.state.inputAnswer.length /40;
    return(
      <div>
      <p>Click on the grey areas you'd like to edit below.</p>
        <hr />
        <div id="custom">

          {/* MediaQuery for large screen */}
            <MediaQuery query="(min-width: 576px)">
            <div className="row">
              <div className="col alignL">

                <StarsSimple
                  changeRating={this.changeRating}
                  stars={this.state.inputRating}
                  />
                  </div>

              <div className="col alignR">
                <p>{date} {' | '} {this.renderInput('editCollection')}</p>
              </div>
            </div>
          </MediaQuery>
            <div className="g-box answer">
            <div className="media-body">
            <br />
            <h4 className="paragraph-font show-whitespace" id="quote-random_0">
              {this.renderInput('editAnswer')}
              </h4>
              <br />
            </div>
            </div>

             <br />
             {/* MediaQuery for small screen */}
             <MediaQuery query="(max-width: 576px)">
             <StarsSimple
               changeRating={this.changeRating}
               stars={this.state.inputRating}
               />
               <br />
               <p>{date} {' | '} {this.renderInput('editCollection')}
                  </p>
             </MediaQuery>
           </div>
          <br />
          {/* Button trigger modal */}
          <button id="update-goodminder" type="button" className="btn btn-green" data-toggle="modal" onClick={this.handleClick} data-target="#editModal">
            Update Goodminder
          </button>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    gminder: state.navigation.currentGM
  }
}

export default connect(mapStateToProps, actions)(EditCustom);
