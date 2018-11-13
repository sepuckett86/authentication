import React from 'react';
import Stars from './Stars';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Quote extends React.Component {
  makeCredit() {
    const quote = this.props.goodminder;
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

    return(
        <div id="quote">

          {/* MediaQuery for large screen */}
            <MediaQuery query="(min-width: 576px)">
            <div className="row">
              <div className="col alignL">
                <Stars/>
              </div>
              <div className="col alignR">
                <p>Added {this.props.goodminder.recordedDate} from Quote Collection: {this.props.goodminder.collection}</p>
              </div>
            </div>
            </MediaQuery>

      			<div className="g-box">
      			<div className="media-body">
      			<br />
      			<h4 className="paragraph-font alignL" id="quote-random_0">
      				"{this.props.goodminder.mainResponse}"</h4>
              <br />
              <p className="paragraph-font alignR" id="quote-who-source-author">
                {this.makeCredit()}</p>
      				<br />
      			</div>
      			</div>
      			<br />
            {/* Determine if there is reason content */}
            { this.props.goodminder.reason ?
              (<div className="media reason g-box">
              <div className="media-body paragraph-font" id="quote-reason">
                {this.props.goodminder.reason}
              </div>
            </div>)
              : null }

                <br />
                {/* MediaQuery for small screen */}
                <MediaQuery query="(max-width: 576px)">
                <Stars/>
                  <br />
                <p>{this.props.goodminder.recordedDate ? (this.props.goodminder.recordedDate + ' | '): null}
                   {this.props.goodminder.collection}</p>

             </MediaQuery>
    			</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    gminder: state.navigation.currentGM,
  };
}

export default connect(mapStateToProps, actions)(Quote);
