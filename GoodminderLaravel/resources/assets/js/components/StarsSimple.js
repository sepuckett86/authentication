import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../../css/Stars.css';

/* First goal: Generate correct number of Stars
    then onClick, change icon */
class StarsSimple extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stars: this.props.stars
    }
    this.changeRating = this.props.changeRating;
    this.handleClick = this.handleClick.bind(this);
  }

/* const stars must be updated to reflect database value */
  makeStarArray(stars) {
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
      const stars = Number(event.currentTarget.id) + 1;
      if (stars === this.state.stars) {
        this.changeRating(0);
        this.setState({stars: 0})
      } else {
        this.changeRating(stars);
        this.setState({stars: stars})
      }
  }

  generateKey(index) {
    return `${ index }_${ new Date().getTime() }`;
  }

  render() {
    return(

      <div>
      {
        this.makeStarArray(this.state.stars).map((x, i) => {
          return (<span key={ this.generateKey(i) }>
            {/* Button trigger modal */}
            <button id={i} type="button" onClick={this.handleClick} className="btn-editStar" >
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
    gminder: state.navigation.currentGM
  }
}
export default connect(mapStateToProps, actions)(StarsSimple);
