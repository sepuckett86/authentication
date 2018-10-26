import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Prompt from './GoodmindersPrompt';
import Quote from './GoodmindersQuote';
import Custom from './GoodmindersCustom';

class Goodminders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompts: [],
    }
    this.nextClick = this.nextClick.bind(this);
    this.backClick = this.backClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // On mount, clear previous nav state
    this.props.navClear();
    // Then set current gminder
    if (this.props.goodminders.length > 0 ) {
      let current = this.props.goodminders[0];
      this.props.setCurrentGM(current);
      // Also set current gminder to first in previous list
      this.props.setPreviousGM([current]);
      // If current gminder is a prompt response, find and store prompt
      if (current.category === 'prompt') {
        let currentPrompt = {};
        for (let i = 0; i < this.props.prompts.length; i++) {
          if (this.props.prompts[i].id === current.promptID) {
            currentPrompt = this.props.prompts[i];
          } else {
          }
        }
        this.props.setCurrentPrompt(currentPrompt);
        }

    }
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
    // Check that there we haven't gone back yet
    if (this.props.backGM === 0) {
      // Check that there are gminders in database
      if (this.props.goodminders.length !== 0) {
        // If we've gone through everything, clear history.
        if (this.props.previousGM.length === this.props.goodminders.length) {
          alert("You've gone through all of your goodminders. Reload to reset.")
        } else {
          let a = true;
          let brake = 20;
          while (a === true && brake > 0) {
            let unique = true;
            let previous = this.props.previousGM;
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

            if (unique === true) {
              let previous = this.props.previousGM;
              previous.push(random);
              this.props.setCurrentGM(random);
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
      let next = this.props.previousGM[this.props.previousGM.length - this.props.backGM];
      let back = this.props.backGM - 1;
      this.props.setBackGM(back);
      this.props.setCurrentGM(next);
    }
  }

  backClick() {
    // If nothing to go back to
    if (this.props.previousGM.length === 1) {
      alert("Nothing there. Go forward :)");
    } else {
    // If at beginning of previous array
    if (this.props.previousGM.length === this.props.backGM + 1) {
      alert("Nothing there. Go forward :)")// If not at beginning and have something to go back to);
    } else if (this.props.previousGM.length > 1) {
      let current = this.props.previousGM[this.props.previousGM.length - 2 - this.props.backGM];
      let back = this.props.backGM + 1;
      this.props.setBackGM(back);
      this.props.setCurrentGM(current);
    }
    }
  }

  chooseDisplay() {
    let gminder = this.props.currentGM;
    if(gminder.category === 'prompt') {
      return <Prompt/>
    }
    if(gminder.category === 'quote') {
      return <Quote/>
    }
    if(gminder.category === 'custom') {
      return <Custom/>
    } else {
      return <p>Category Error</p>
    }
  }

  checkContent() {
    // Does user have goodminders to display?
    if (this.props.goodminders.length === 0) {
      return(
        <div>
          <h1>Get Started</h1>
          <p>Add your first Goodminder!</p>
          <button type='button' onClick={() => this.props.changeHomeDisplay('add')}>Add</button>
        </div>
      )
    } else {

      return(
        <div className="container">
            <div>
            <button className="btn arrow-button" onClick={this.backClick}><i className="fas fa-arrow-left"></i> </button>
            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
            <button className="btn arrow-button" onClick={this.nextClick}> <i className="fas fa-arrow-right"></i></button>
            </div>
            <div className="box">
        			{this.chooseDisplay()}
              <div className="edit-print">
              <button id='edit-button' onClick={this.handleClick} className="btn button-transparent">
                <i className="fas fa-edit"></i>
              </button>
              <button id='print-button' onClick={this.handleClick} className="btn button-transparent">
                <i className="fas fa-print"></i>
              </button>
            </div>
            </div>
            <br />
            <div>
            <div className="row">
              <div className="col col-12 col-sm-6">
                <button className='btn-custom btn' type='button' onClick={() => this.props.changeHomeDisplay('add')}>
                  Add</button>
              </div>
              <div className="col col-12 col-sm-6">
                <button className='btn-custom btn'>More</button>
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
        {console.log(this.props.navigation)}
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
    navigation: state.navigation
  };
}

export default connect(mapStateToProps, actions)(Goodminders);
