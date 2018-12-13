import React from 'react';
import Stars from './Stars';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ReactTooltip from 'react-tooltip';

class Prompt extends React.Component {


  render() {
    const style = {
      fontSize: '20px'
    }
    const gminder = this.props.currentGM;
    const prompt = gminder.promptText;
    const date = gminder.date;
    return(
      <div id="prompt">
        {/* MediaQuery for large screen */}
          <MediaQuery query="(min-width: 576px)">
            <div className="row">
              <div className="col alignL">
                <Stars
                gminder={gminder}
                  />
              </div>
            <div className="col alignR paragraph-font">
              <p>{date} {gminder.collection ?
                <span>{ this.props.displayGM === 'random' ?
                <span>{' | '} <button className='btn-flat btn-blue' data-tip='Click to see goodminders in this collection only' onClick={()=>{this.props.setDisplayGM('same')}}>{gminder.collection}</button></span>
                :
                <span>{' | '} <button className='btn-flat btn-blue' data-tip='Click to see goodminders in all collections' onClick={()=>{this.props.setDisplayGM('random')}}><b>{gminder.collection}</b></button></span>
                }</span>
                : null }</p>
            </div>
            </div>
          </MediaQuery>
          <div className="paragraph-font">
            <div className="g-box">

                <p className="paragraph-font" style={style}>{prompt}</p>

            </div>
            <br />

            <div className="g-box">

            <br />
            <h4 className='show-whitespace'>{this.props.currentGM.mainResponse}</h4><br />

            </div>

            { this.props.currentGM.reason ?
              <div>
            <br />
            <div className="g-box show-whitespace" style={style}>

            {this.props.currentGM.reason}

            </div>

          </div>
            : null}
</div>
            <br />
       {/* MediaQuery for small screen */}
       <MediaQuery query="(max-width: 576px)">

          <Stars

            gminder={gminder}

            />
          <br />
            <p>{date} {gminder.collection ?
              <span>{ this.props.displayGM === 'random' ?
              <span>{' | '} <button className='btn-flat btn-blue' data-tip='Click to see goodminders in this collection only' onClick={()=>{this.props.setDisplayGM('same')}}>{gminder.collection}</button></span>
              :
              <span>{' | '} <button className='btn-flat btn-blue' data-tip='Click to see goodminders in all collections' onClick={()=>{this.props.setDisplayGM('random')}}><b>{gminder.collection}</b></button></span>
              }</span>
              : null }</p>
       </MediaQuery>

       <ReactTooltip delayShow={200}/>
    </div>
  )
  }
}

function mapStateToProps(state) {
  return {
    currentGM: state.navigation.currentGM,
    prompt: state.navigation.currentPrompt,
    prompts: state.prompts,
    displayGM: state.navigation.displayGM
  };
}

export default connect(mapStateToProps, actions)(Prompt);
