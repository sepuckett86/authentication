import React from 'react';

class AddCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAnswer : '',
      inputCollection : ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      userID: 1,
      category: 'custom',
      mainResponse: this.state.inputAnswer,
      author: null,
      promptID: null,
      reason: null,
      source: null,
      who: null,
      rating: 0,
      recordedDate: date,
      eventDate: null,
      updatedDate: null,
      collection: this.state.inputCollection,
      publicFlag: 0,
    }
    console.log(newGminder)
    return newGminder;
  }

  handleClick(event) {
    if (event.target.id === "create-goodminder") {
      const gminder = this.newGminder();
      this.props.setGminderForDatabase(gminder);
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
                      <input type="text" className="form-control" value={this.state.inputCollection} onChange={this.handleChange} id="custom-collection" placeholder="Example: Affirmations"/>
                  </div>
              </div>
          </form>
          <br />
          {/* Button trigger modal */}
          <button id="create-goodminder" type="button" className="btn btn-small" data-toggle="modal" onClick={this.handleClick} data-target="#exampleModal">
            Create Goodminder
          </button>
      </div>

    )
  }
}

export default AddCustom;
