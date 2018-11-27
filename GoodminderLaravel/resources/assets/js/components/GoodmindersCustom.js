import React from 'react';
import Stars from './Stars';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Custom extends React.Component {

  render() {
    const gminder = this.props.goodminder;
    const date = gminder.date;
    return(
      <div id="custom">

        {/* MediaQuery for large screen */}
          <MediaQuery query="(min-width: 576px)">
          <div className="row">
            <div className="col alignL">
              <Stars
                gminder={this.props.goodminder}
                />
            </div>
            <div className="col alignR">
              <p>{date} {gminder.collection ? ' | ' + gminder.collection : null }</p>
            </div>
          </div>
        </MediaQuery>
          <div className="g-box answer">
          <div className="media-body">
          <br />
          <h4 className="paragraph-font" id="quote-random_0">
            {this.props.goodminder.mainResponse}</h4>
            <br />
          </div>
          </div>

           <br />
           {/* MediaQuery for small screen */}
           <MediaQuery query="(max-width: 576px)">
           <Stars
             gminder={this.props.goodminder}
             />
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
    gminder: state.navigation.currentGM
  };
}

export default connect(mapStateToProps, actions)(Custom);
