import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import StarsSimple from './StarsSimple';

class EditQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAnswer: this.props.gminder.mainResponse,
      inputReason: this.props.gminder.reason || '',
      inputAuthor: this.props.gminder.author || '',
      inputCollection: this.props.gminder.collection || '',
      inputSource: this.props.gminder.source || '',
      inputWho: this.props.gminder.who || '',
      inputRating: this.props.gminder.rating
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }


  handleClick(event) {
    if (event.target.id === "update-goodminder") {
      const gminder = this.newGminder();
      this.props.setUpdatedGM(gminder);
    }
  }

  handleChange(event) {
    if (event.target.id === "quote-answer") {
      this.setState({inputAnswer: event.target.value});
    }
    if (event.target.id === "quote-reason") {
      this.setState({inputReason: event.target.value});
    }
    if (event.target.id === "quote-author") {
      this.setState({inputAuthor: event.target.value});
    }
    if (event.target.id === "quote-collection") {
      this.setState({inputCollection: event.target.value});
    }
    if (event.target.id === "quote-source") {
      this.setState({inputSource: event.target.value});
    }
    if (event.target.id === "quote-who") {
      this.setState({inputWho: event.target.value});
    }
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
      category: 'quote',
      mainResponse: this.state.inputAnswer,
      author: this.state.inputAuthor,
      promptID: null,
      reason: this.state.inputReason,
      source: this.state.inputSource,
      who: this.state.inputWho,
      rating: this.state.inputRating,
      recordedDate: date,
      eventDate: null,
      updatedDate: null,
      collection: this.state.inputCollection,
      publicFlag: 0,
    }
    console.log(newGminder)
    return newGminder;
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
                  <label>Quote</label>
                  <textarea id="quote-answer" value={this.state.inputAnswer}
                    onChange={this.handleChange} className="form-control" rows="3"
                    >
                    </textarea>
                  <br />
                  <div className="form-group">
                      <label>Who Said It (Perhaps a Fictional Character)</label>
                      <input type="text" value={this.state.inputWho}
                        onChange={this.handleChange} className="form-control"
                        id="quote-who"
                        />
                  </div>
                  <div className="form-group">
                      <label>Author</label>
                      <input type="text" value={this.state.inputAuthor}
                        onChange={this.handleChange} className="form-control"
                        id="quote-author"
                        />
                  </div>
                  <div className="form-group">
                      <label>Source</label>
                      <input type="text" value={this.state.inputSource}
                        onChange={this.handleChange} className="form-control"
                        id="quote-source"
                        />
                  </div>
                  <br />
                  <label>Reason</label>
                  <textarea className="form-control"
                    value={this.state.inputReason}
                    onChange={this.handleChange}
                    id="quote-reason" rows="3"
                    ></textarea>
                  <br />
                  <div className="form-group">
                      <label>Collection</label>
                      <input type="text" value={this.state.inputCollection}
                        onChange={this.handleChange} className="form-control"
                        id="quote-collection" />
                  </div>
              </div>
              <br />

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

export default connect(mapStateToProps, actions)(EditQuote);
