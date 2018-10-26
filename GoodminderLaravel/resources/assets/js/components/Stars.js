import React from 'react';
import '../../css/Stars.css';
import { connect } from 'react-redux';
import * as actions from '../actions';

/* First goal: Generate correct number of Stars
    then onClick, change icon */
class Stars extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numForDatabase: null
    }
    this.handleClick = this.handleClick.bind(this);
  }

/* const stars must be updated to reflect database value */
  makeStarArray() {
    let stars = this.props.gminder.rating;
    let myArray = [];
    for(let i = stars; i > 0; i--) {
      myArray.push('fas fa-star');
    }
    for(let j = 5-stars; j > 0; j--) {
      myArray.push('far fa-star');
    }
    return myArray;
  }

  handleClick(event) {

    // Handle first star click
    // Note: currentTarget is necessary to record the number; target does not work
    if (event.currentTarget.id !== 'starModal') {
      const numForDatabase = Number(event.currentTarget.id) + 1;
      this.setState({numForDatabase: numForDatabase})
    }
    // Handle modal 'Confirm' click
    if (event.target.id === 'starModal') {
      let stars = this.state.numForDatabase
      // Create gminder to push
      let updatedGminder = this.props.gminder;

      // change database
      if (stars === this.props.gminder.rating) {
        updatedGminder['rating'] = 0;
        this.changeDatabase(updatedGminder);
        this.setState({
          numForDatabase: null
        })

      } else {
      updatedGminder['rating'] = stars;
      this.changeDatabase(updatedGminder);
      this.setState({
        numForDatabase: null
      })

    }
    }
  }
  changeDatabase(updatedGminder) {
    // Gminder.updateGminder(updatedGminder);
  }

  generateKey(index) {
    return `${ index }_${ new Date().getTime() }`;
  }

  render() {
    return(

      <div>
        {/* Modal */}
        <div className="modal fade" id="starsModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit star rating</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Make permanent change to database?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id="starModal" type="button" data-dismiss="modal" className="btn btn-primary" onClick={this.handleClick}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      {/* End Modal */}

      {
        this.makeStarArray().map((x, i) => {
          return (<span key={ this.generateKey(i) }>
            {/* Button trigger modal */}
            <button id={i} type="button" onClick={this.handleClick} className="star-button" data-toggle="modal" data-target="#starsModal">
            <i className={x}></i></button>


          </span>)
        })
      }
    </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    goodminders: state.goodminders,
    gminder: state.navigation.currentGM,
    previousGM: state.navigation.previousGM,
    backGM: state.navigation.backGM,
    currentPrompt: state.navigation.currentPrompt
  };
}

export default connect(mapStateToProps, actions)(Stars);
