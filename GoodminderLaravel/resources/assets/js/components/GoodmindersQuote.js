import React from 'react';
import Stars from './Stars';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Quote extends React.Component {
  makeCredit() {
    const quote = this.props.currentGM;
    if (quote.who && quote.source && quote.author) {
      return `-- ${quote.who}, from ${quote.source} by ${quote.author}`
    }
    if (!quote.who && quote.source && quote.author) {
      return `-- ${quote.author}, ${quote.source}`;
    }
    if (!quote.who && !quote.source && quote.author) {
      return `-- ${quote.author}`;
    }
    if (!quote.who && !quote.source && !quote.author) {
      return null;
    }
    if (quote.who && !quote.source && quote.author) {
      return `-- ${quote.who}, from a work by ${quote.author}`;
    }
    if (quote.who && !quote.source && !quote.author) {
      return `-- ${quote.who}`;
    }
  }
  render() {
    const gminder = { ...this.props.currentGM };
    const date = gminder.date;
    return(
        <div id="quote">

          {/* MediaQuery for large screen */}
            <MediaQuery query="(min-width: 576px)">
            <div className="row">
              <div className="col alignL">
                <Stars
                  gminder={gminder}/>
              </div>
              <div className="col alignR">
                <p>{date} {gminder.collection ? ' | ' + gminder.collection : null }</p>
              </div>
            </div>
            </MediaQuery>

      			<div className="g-box">
      			<div className="media-body">
      			<br />
      			<h4 className="paragraph-font alignL" id="quote-random_0">
      				"{this.props.currentGM.mainResponse}"</h4>
              <br />
              <p className="paragraph-font alignR" id="quote-who-source-author">
                {this.makeCredit()}</p>
      				<br />
      			</div>
      			</div>
      			<br />
            {/* Determine if there is reason content */}
            { this.props.currentGM.reason ?
              (<div className="media reason g-box">
              <div className="media-body paragraph-font" id="quote-reason">
                {this.props.currentGM.reason}
              </div>
            </div>)
              : null }

                <br />
                {/* MediaQuery for small screen */}
                <MediaQuery query="(max-width: 576px)">
                <Stars
                  gminder={this.props.currentGM}/>
                  <br />
                <p>{date} {gminder.collection ? ' | ' + gminder.collection : null }
                   </p>

             </MediaQuery>
    			</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentGM: state.navigation.currentGM
  };
}

export default connect(mapStateToProps, actions)(Quote);
