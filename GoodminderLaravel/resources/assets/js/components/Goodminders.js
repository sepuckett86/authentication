import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { CSSTransition } from "react-transition-group";
import AnimateHeight from "react-animate-height";

import '../../css/Goodminders.css';

import Prompt from './GoodmindersPrompt';
import Quote from './GoodmindersQuote';
import Custom from './GoodmindersCustom';
import Loading from './Loading';
import FirstGoodminder from './FirstGoodminder';


class Goodminders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomizedGoodminders: [],
      currentIndex: 0,
      prompts: [],
      length: '',
      newCurrentGM: {},
      animate: false,
      height: 'auto'
    }
    this.nextClick = this.nextClick.bind(this);
    this.backClick = this.backClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.shuffleGoodminders = this.shuffleGoodminders.bind(this);
  }

  componentDidMount() {
    // On mount, clear previous nav state
    this.props.navClear();
    this.props.clearResponse();
    // Request to pull from database
    this.shuffleGoodminders();
  }
  // from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  shuffleGoodminders() {
    this.props.getGoodminders(() => {
      // Make randomized array of all goodminders and save in state.
      const randomized = this.shuffle(this.props.goodminders);
      this.setState({
        randomizedGoodminders: randomized
      })
      // Then set current gminder
      if (this.props.goodminders.length > 0) {
        let current = this.state.randomizedGoodminders[0];
        this.props.setCurrentGM(current);
      }
      this.setState({
        length: this.props.goodminders.length,
        goodminder: this.props.currentGM
      })
    })
  }

  // Button methods
  handleClick(event) {
    // Note: currentTarget is required to prevent clicking on the icon doing nothing
    // target alone does not work for this and only part of the button is clickable
    if (event.currentTarget.id === 'edit-button') {
      this.props.changeHomeDisplay('edit');
    }
    if (event.currentTarget.id === 'print-button') {
      this.props.changeHomeDisplay('print');
    }
  }

  // Sets a new random gminder as state and accounts for back/forward ability
  nextClick() {
    const goodminders = this.state.randomizedGoodminders;
    let index = this.state.currentIndex;
    // Only allow once transition complete
    if (this.state.animate === false) {
      // Check that there are gminders
      if (goodminders.length !== 0) {

        // while loop for displayGM condition
        if (this.props.displayGM === "same") {
          const currentCollection = this.props.currentGM.collection;
          while(index < goodminders.length - 1) {
            if (goodminders[index + 1].collection === currentCollection) {
              break;
            }
            index++;
          }
        }

        // If we've gone through everything, alert.
        if (index + 1 >= goodminders.length) {
          alert("You've gone through all of your goodminders. Reload to reset.")
        } else if (index + 1 < goodminders.length) {
          const nextGM = goodminders[index + 1];
          this.setState({
            animate: true,
            newCurrentGM: nextGM,
            currentIndex: index + 1,
          })
        }
      }
    }
    // If no gminders in database
    if (goodminders.length === 0) {
      console.log('There are no gminders');
    }
  }

  backClick() {
    const goodminders = this.state.randomizedGoodminders;
    let index = this.state.currentIndex;
    // Only allow when transition complete
    if (this.state.animate === false) {

      // while loop for displayGM condition
      if (this.props.displayGM === "same") {
        const currentCollection = this.props.currentGM.collection;
        while(index > 0) {
          if (goodminders[index - 1].collection === currentCollection) {
            break;
          }
          index--;
        }
      }

    // If nothing to go back to
    if (index - 1 < 0) {
      alert("Nothing there. Go forward :)");
    } else if (index - 1 >= 0) {

      const previousGM = goodminders[index - 1];
      this.setState({
        animate: true,
        newCurrentGM: previousGM,
        currentIndex: index - 1
      })
    }
    }
  }

  chooseDisplay() {
    let gminder = this.props.currentGM;
    if(gminder.category === 'prompt') {
      return <Prompt />
    }
    else if(gminder.category === 'quote') {
      return <Quote />
    }
    else if(gminder.category === 'custom') {
      return <Custom />
    }
    else if (this.props.goodminders.length === 0){
      return <div><Loading /><br /></div>
    }
    else if (!this.props.currentGM.mainResponse){
      return <div><Loading /><br /></div>
    }
    else {
      return <p>Category error</p>
    }
  }

  checkContent() {
    // Does user have goodminders to display?
    // Also test for empty responseError object
    if (this.state.length === 0 && Object.keys(this.props.responseError).length === 0) {
      return(
        <FirstGoodminder />
      )
    } else if (Object.keys(this.props.responseError).length !== 0) {
      console.log(this.props.responseError)
      return (<div className='loading-box'>
      <h3>Problems with access to the Goodminder server. Check your internet connection.</h3>
      </div>)
    } else {

      return(
        <div className="container">
            <div>
            <button className="btn arrow-button" onClick={this.backClick}><i className="fas fa-arrow-left"></i> </button>
            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
            <button className="btn arrow-button" onClick={this.nextClick}> <i className="fas fa-arrow-right"></i></button>
            </div>
            <div className="box">
            <CSSTransition
                in={this.state.animate}
                timeout={1000}
                classNames="fade"
                onEnter={() => {
                  // Changing height is what triggers the animation
                  this.setState({
                    height: "1000",
                  });
                }}
                onEntered={() => {
                  this.props.setCurrentGM(this.state.newCurrentGM);
                    this.setState({
                      // need to put forward/backclick logic here

                      animate: false,
                      height: "auto"
                    });
                  }
                }
              >
                {state => (
                  <div>
                    <div>
                      <AnimateHeight
                        duration={1000}
                        height={this.state.height} // see props documentation bellow
                      >
        			{this.chooseDisplay()}
              </AnimateHeight>
            </div>
          </div>
        )}
      </CSSTransition>

              <div className="edit-print">
              <button id='edit-button' onClick={this.handleClick} className="btn-flat btn-blue">
                <i className="fas fa-edit"></i>
              </button>
              <button id='print-button' onClick={this.handleClick} className="btn-flat btn-blue">
                <i className="fas fa-print"></i>
              </button>
            </div>
            </div>
            <br />
            <div>
            <div className="row">
              <div className="col col-12 col-sm-6">
                <button className='btn-custom btn' type='button' onClick={() => {this.props.changeAddDisplay('empty'); this.props.changeHomeDisplay('add'); this.props.setCurrentPrompt({})}}>
                  <i className="fas fa-plus"></i>{' '}Add</button>
              </div>
              <div className="col col-12 col-sm-6">
                <button className='btn-custom btn' type='button' onClick={() => this.props.changeHomeDisplay('more')}>
                More</button>
              </div>
            </div>
          </div>
          <br /><br /><br />
          </div>
      )
    }

  }
  render() {
    return (
      <div>
        {this.checkContent()}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    goodminders: state.goodminders,
    prompts: state.prompts,
    currentGM: state.navigation.currentGM,
    currentPrompt: state.navigation.currentPrompt,
    navigation: state.navigation,
    responseError: state.response.responseError,
    displayGM: state.navigation.displayGM
  };
}

export default connect(mapStateToProps, actions)(Goodminders);
