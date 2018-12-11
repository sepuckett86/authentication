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
      filteredGoodminders: this.props.goodminders,
      prompts: [],
      length: '',
      newCurrentGM: {},
      animate: false,
      height: 'auto'
    }
    this.nextClick = this.nextClick.bind(this);
    this.backClick = this.backClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.filterGoodminders = this.filterGoodminders.bind(this);
  }

  componentDidMount() {
    // On mount, clear previous nav state
    this.props.navClear();
    this.props.clearResponse();
    // Request to pull from database
    this.props.getGoodminders(() => {
      // Then set current gminder
      if (this.props.goodminders.length > 0) {
        let current = this.props.goodminders[Math.floor(Math.random() * this.props.goodminders.length)];
        this.props.setCurrentGM(current);
        // Also set current gminder to first in previous list
        this.props.setPreviousGM([current]);
      }
      this.setState({
        length: this.props.goodminders.length,
        goodminder: this.props.currentGM
      })
      this.props.getCollections(() => {

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

  filterGoodminders() {
    const filtered = this.props.goodminders.filter(goodminder =>
      goodminder.collection === this.props.currentGM.collection
    )
    this.setState({
      filteredGoodminders: filtered
    })
  }

  // Sets a new random gminder as state and accounts for back/forward ability
  nextClick() {
    if (this.state.animate === false) {
    // Check that there we haven't gone back yet
    if (this.props.backGM === 0) {
      // Check that there are gminders in database
      if (this.props.goodminders.length !== 0) {
        // If we've gone through everything, alert.
        if (this.props.previousGM.length === this.props.goodminders.length) {
          alert("You've gone through all of your goodminders. Reload to reset.")
        } else {
          this.setState({animate: true});
          let a = true;
          let brake = 20;
          while (a && brake > 0) {
            let unique = true;
            let previous = [ ...this.props.previousGM ];
            // Pick random gminder and save it
            let random = this.props.goodminders[Math.floor(Math.random() * this.props.goodminders.length)];
            // Make sure we haven't already seen this one
            for (let i = 0; i < previous.length; i++)
              if (previous[i] === random) {
                unique = false;
              }
            else {
              // Do nothing
            }
            if (unique) {
              let previous = [ ...this.props.previousGM ];
              previous.push(random);
              this.setState({
                newCurrentGM: random
              })

              this.props.setPreviousGM(previous);
              a = false;
            }
            brake--;
          } // End while loop
        }
      }
    }
    // If no gminders in database
    if (this.props.goodminders.length === 0) {
      console.log('There are no gminders');
    }

    // If we have gone back and are going forward again
    if (this.props.backGM !== 0) {
      this.setState({animate: true});
      let next = this.props.previousGM[this.props.previousGM.length - this.props.backGM];
      let back = this.props.backGM - 1;
      this.props.setBackGM(back);
      this.setState({
        newCurrentGM: next
      })
    }
  }

  }

  backClick() {
    if (this.state.animate === false) {
    // If nothing to go back to
    if (this.props.previousGM.length === 1) {
      alert("Nothing there. Go forward :)");
    } else {
    // If at beginning of previous array
    if (this.props.previousGM.length === this.props.backGM + 1) {
      alert("Nothing there. Go forward :)")// If not at beginning and have something to go back to);
    } else if (this.props.previousGM.length > 1) {
      this.setState({animate: true});
      let current = this.props.previousGM[this.props.previousGM.length - 2 - this.props.backGM];
      let back = this.props.backGM + 1;
      this.props.setBackGM(back);
      this.setState({
        newCurrentGM: current
      })
    }
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
    previousGM: state.navigation.previousGM,
    backGM: state.navigation.backGM,
    currentPrompt: state.navigation.currentPrompt,
    navigation: state.navigation,
    responseError: state.response.responseError,
    displayGM: state.navigation.displayGM
  };
}

export default connect(mapStateToProps, actions)(Goodminders);
