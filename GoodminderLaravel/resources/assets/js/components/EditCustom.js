import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import StarsSimple from './StarsSimple';


class EditCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAnswer : this.props.gminder.mainResponse,
      inputCollection : this.props.gminder.collection || '',
      inputRating: this.props.gminder.rating
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  getDate() {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    const fullDate = `${month}/${day}/${year}`;
    return fullDate;
  }

  newGminder() {
    const date = this.getDate();
    const newGminder = {
      id: this.props.gminder.id,
      userID: 1,
      category: 'custom',
      mainResponse: this.state.inputAnswer,
      author: null,
      promptID: null,
      reason: null,
      source: null,
      who: null,
      rating: this.state.inputRating,
      recordedDate: this.props.gminder.recordedDate,
      eventDate: null,
      updatedDate: date,
      collection: this.state.inputCollection,
      publicFlag: 0,
    }
    console.log(newGminder)
    return newGminder;
  }

  handleClick(event) {
    if (event.target.id === "update-goodminder") {
      const gminder = this.newGminder();
      this.props.setUpdatedGM(gminder);
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
    return(
      <div>
        <hr />
          <form>
              <div className="form-group">

                  <label>Enter Anything</label>
                  <textarea className="form-control" value={this.state.inputAnswer} onChange={this.handleChange} id="custom-answer" rows="3"></textarea>
                  <br />
                  <div className="form-group">
                      <label>Collection</label>
                      <input type="text" className="form-control" value={this.state.inputCollection} onChange={this.handleChange} id="custom-collection"/>
                  </div>
              </div>
          </form>
          <StarsSimple
            changeRating={this.changeRating}
            stars={this.state.inputRating}
            />
          <br />
          {/* Button trigger modal */}
          <button id="update-goodminder" type="button" className="btn btn-small" data-toggle="modal" onClick={this.handleClick} data-target="#editModal">
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
