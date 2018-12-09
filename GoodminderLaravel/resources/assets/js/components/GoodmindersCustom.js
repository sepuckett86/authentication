import React from 'react';
import Stars from './Stars';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ReactTooltip from 'react-tooltip';

class Custom extends React.Component {

  render() {
    const gminder = this.props.currentGM;
    const date = gminder.date;
    return(
      <div id="custom">

        {/* MediaQuery for large screen */}
          <MediaQuery query="(min-width: 576px)">
          <div className="row">
            <div className="col alignL">
              <Stars
                gminder={this.props.currentGM}
                />
            </div>
            <div className="col alignR">
              <p>{date} {gminder.collection ?
                <span>{ this.props.displayGM === 'random' ?
                <span>{' | '} <button className='btn-flat btn-blue' data-tip='Click to see goodminders in this collection only' onClick={()=>{this.props.setDisplayGM('same')}}>{gminder.collection}</button></span>
                :
                <span>{' | '} <button className='btn-flat btn-blue' data-tip='Click to see goodminders in all collections' onClick={()=>{this.props.setDisplayGM('random')}}><b>{gminder.collection}</b></button></span>
                }</span>
                : null }

              </p>
            </div>
          </div>
        </MediaQuery>
          <div className="g-box answer">
          <div className="media-body">
          <br />
          <h4 className="paragraph-font show-whitespace" id="quote-random_0">
            {this.props.currentGM.mainResponse}</h4>
            <br />
          </div>
          </div>

           <br />
           {/* MediaQuery for small screen */}
           <MediaQuery query="(max-width: 576px)">
           <Stars
             gminder={this.props.currentGM}
             />
             <br />
             <p>{date} {gminder.collection ? ' | ' + gminder.collection + ' ': null }
                </p>
           </MediaQuery>
           <ReactTooltip delayShow={200}/>
         </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    currentGM: state.navigation.currentGM,
    displayGM: state.navigation.displayGM
  };
}

export default connect(mapStateToProps, actions)(Custom);
