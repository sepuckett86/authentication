import React from 'react';
import Stars from './Stars';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Prompt extends React.Component {


  render() {
    const prompt = this.props.prompt.promptText;
    const style = {
      fontSize: '20px'
    }
    const gminder = this.props.currentGM;
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
              <p>{date} {gminder.collection ? ' | ' + gminder.collection : null }</p>
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
            <h4>{this.props.currentGM.mainResponse}</h4><br />

            </div>

            { this.props.currentGM.reason ?
              <div>
            <br />
            <div className="g-box" style={style}>

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
            <p>{date} {gminder.collection ? ' | ' + gminder.collection : null }</p>
       </MediaQuery>


    </div>
  )
  }
}

function mapStateToProps(state) {
  return {
    currentGM: state.navigation.currentGM,
    prompt: state.navigation.currentPrompt,
    prompts: state.prompts
  };
}

export default connect(mapStateToProps, actions)(Prompt);
