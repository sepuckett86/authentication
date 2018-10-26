// Note: modal cannot be inside responsive design display or it will not work for all screen sizes
import { connect } from 'react-redux';
import * as actions from '../actions';

import React from 'react';
import '../../css/Add.css';
import AddCustom from './AddCustom';
import AddPrompt from './AddPrompt';
import AddQuote from './AddQuote';

import MediaQuery from 'react-responsive';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gminderForDatabase: {}
    }
    this.setGminderforDatabase = this.setGminderforDatabase.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.id === "prompt-tab") {
      this.props.changeAddDisplay('prompt');
    }
    if (event.target.id === "quote-tab") {
      this.props.changeAddDisplay('quote');
    }
    if (event.target.id === "custom-tab") {
      this.props.changeAddDisplay('custom');
    }
  }

  setGminderforDatabase(gminder) {
    this.setState({gminderForDatabase: gminder})
  }

  chooseType() {
    if(this.props.display === 'empty') {
      return(<div>
        <div className='my-flex-parent'>
          <button id="prompt-tab" className='my-flex-child btn-left btn' onClick={this.handleClick}>
            Prompt
          </button>
          <button id="quote-tab" className='my-flex-child btn-center btn' onClick={this.handleClick}>
            Quote
          </button>
          <button id="custom-tab" className='my-flex-child btn-right btn' onClick={this.handleClick}>
            Custom
          </button>
        </div>
      </div>)
    }
    if(this.props.display === 'prompt') {
      return(<div>
        <div className='my-flex-parent'>
          <button id="prompt-tab" className='my-flex-child-active btn-left btn' onClick={this.handleClick}>
            Prompt
          </button>
          <button id="quote-tab" className='my-flex-child btn-center btn' onClick={this.handleClick}>
            Quote
          </button>
          <button id="custom-tab" className='my-flex-child btn-right btn' onClick={this.handleClick}>
            Custom
          </button>
        </div>
        <AddPrompt
              changeType={this.changeType}
              changeDisplay={this.props.changeDisplay}
              prompts={this.props.prompts}
              randomClick={this.props.randomClick}
              setPrompt={this.props.setPrompt}
              setCollection={this.props.setCollection}
              setGminderForDatabase={this.setGminderforDatabase}
              random="yes" />
            </div>)
    }
    if(this.props.display === 'quote') {
      return(<div>
        <div className='my-flex-parent'>
          <button id="prompt-tab" className='my-flex-child btn-left btn' onClick={this.handleClick}>
            Prompt
          </button>
          <button id="quote-tab" className='my-flex-child-active btn-center btn' onClick={this.handleClick}>
            Quote
          </button>
          <button id="custom-tab" className='my-flex-child btn-right btn' onClick={this.handleClick}>
            Custom
          </button>
        </div>
      <AddQuote
              changeType={this.changeType}
              randomClick={this.props.randomClick}
              changeDisplay={this.props.changeDisplay}
              setGminderForDatabase={this.setGminderforDatabase} />
            </div>)
    }
    if(this.props.display === 'custom') {
      return(<div>
        <div className='my-flex-parent'>
          <button id="prompt-tab" className='my-flex-child btn-left btn' onClick={this.handleClick}>
            Prompt
          </button>
          <button id="quote-tab" className='my-flex-child btn-center btn' onClick={this.handleClick}>
            Quote
          </button>
          <button id="custom-tab" className='my-flex-child-active btn-right btn' onClick={this.handleClick}>
            Custom
          </button>
        </div>
          <AddCustom
              changeType={this.changeType}
              randomClick={this.props.randomClick}
              changeDisplay={this.props.changeDisplay}
              setGminderForDatabase={this.setGminderforDatabase}/>
        </div>)
    }
  }

  back(id) {
    this.props.changeType('empty');
    this.props.changeDisplay(id);
  }

  render() {
    return(
      <div className="container">

        {/* Modal - Must be outside of responsive design displays */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create Goodminder</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Make permanent change to database?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=> {
                  this.props.saveGoodminder(this.state.gminderForDatabase);
                  this.props.changeHomeDisplay('goodminders');
                 }}>Confirm</button>
              </div>
            </div>
          </div>
        </div>


          <br />

          <div className="box">
    	         <p>Choose an entry type</p>
               {this.chooseType()}
          </div>

          {/* MediaQuery for small screen */}
          <MediaQuery query="(max-width: 576px)">
            <hr />
          </MediaQuery>
         <br />
         <div className="row">
           <div className="col">
        <button id='random'
        name="Back" onClick={() => this.props.changeHomeDisplay('goodminders')}>
        Back</button>
        <br />

      <br />
    </div>
    <br />
        </div>
  </div>
  )
  }
}

function mapStateToProps(state) {
  return { display: state.display.add,
           goodminders: state.goodminders
            }
}
export default connect(mapStateToProps, actions)(Add);
