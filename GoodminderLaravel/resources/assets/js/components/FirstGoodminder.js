import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class FirstGoodminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 1
    }
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
  }
  next() {
    this.setState({display: this.state.display + 1})
  }
  back() {
    this.setState({display: this.state.display - 1})
  }
  chooseDisplay() {
    switch(this.state.display) {
      case 1:
        return (
          <div>
            <p>Thanks for joining <span className='header-font'>Goodminder</span>!</p>
            <p><span className='header-font'>Goodminder</span> is like a journal, but with a focus on positive thoughts.</p>

            <button onClick={this.next} className='btn arrow-button'>Next <i className="fas fa-arrow-right"></i></button>
          </div>
        )
      case 2:
        return (
          <div>
            <p>There are three kinds of entries (aka goodminders) you can make.</p>
            <button onClick={this.back} className='btn arrow-button'><i className="fas fa-arrow-left"></i> Back</button>
            <button onClick={this.next} className='btn arrow-button'>Next <i className="fas fa-arrow-right"></i></button>
          </div>
        )
      case 3:
        return (
          <div>
          <div className="card top" style={{'color': '#2b2b2b'}}>
            <div className="card-body">
              <h5 className="card-title">1. Prompt response
              </h5>
              <p className="card-text">Read a prompt that inspires you to type in a worthwhile thought. Later you can add prompt collections to be inspired by other Goodminder users or yourself.</p>
            </div>
            </div>
            <button onClick={this.back} className='btn arrow-button'><i className="fas fa-arrow-left"></i> Back</button>
            <button onClick={this.next} className='btn arrow-button'>Next <i className="fas fa-arrow-right"></i></button>
          </div>
        )
      case 4:
        return (
          <div>
          <div className="card top" style={{'color': '#2b2b2b'}}>
          <div className="card-body">
            <h5 className="card-title">2. Quote
            </h5>
            <p className="card-text">Record worthwhile sayings from other people that have a personal meaning to you.</p>
          </div>
            </div>
            <button onClick={this.back} className='btn arrow-button'><i className="fas fa-arrow-left"></i> Back</button>
            <button onClick={this.next} className='btn arrow-button'>Next <i className="fas fa-arrow-right"></i></button>
          </div>
        )
      case 5:
        return (
          <div>
          <div className="card top" style={{'color': '#2b2b2b'}}>
          <div className="card-body">
            <h5 className="card-title">3. Custom text

            </h5>
            <p className="card-text">This is a free space for you to type whatever you want, and to optionally categorize it. Want to remember trombone practice tips? Meditation affirmations? Vocabulary words you want to learn? This is the space.</p>
          </div>
            </div>
            <button onClick={this.back} className='btn arrow-button'><i className="fas fa-arrow-left"></i> Back</button>
            <button onClick={this.next} className='btn arrow-button'>Next <i className="fas fa-arrow-right"></i></button>
          </div>
        )
      case 6:
        return (<div>
          <h3>Ready?</h3>
          <p>It's time to create your first goodminder!</p>
          <button type='button' className='btn-green btn' onClick={() => this.props.changeHomeDisplay('add')}><i className="fas fa-plus"></i>{' '}Add</button>
          <hr />
          <button onClick={this.back} className='btn arrow-button'><i className="fas fa-arrow-left"></i> Back</button>


          </div>)
      default:
        return <div></div>
    }
  }

  render() {
    return (
      <div className='container'>
      <br />
      <div className='box'>
        <h1>Welcome</h1>
        <hr />
        {this.chooseDisplay()}
        </div>
      <br />
      </div>

    )
  }
};

function mapStateToProps(state) {
  return {

  };
}


export default connect(mapStateToProps, actions)(FirstGoodminder);
