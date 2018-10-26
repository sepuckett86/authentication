import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import goodminderLogo from '../../images/logo_dark.png';
import '../../css/Print.css';
import Stars from './Stars';

class Print extends React.Component {
  hideAppHeader() {
    let header = document.getElementById("header");
    header.style.display = "none";
  }

  showAppHeader() {
    let header = document.getElementById("header");
    header.style.display = "block";
  }

  getDate() {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    const fullDate = `${month}/${day}/${year}`;
    return fullDate;
  }

  render() {
    const backgroundStyle = {
      backgroundColor: '#fff',
      minHeight: '100vh'
    };

    const mediaStyle = {
      padding: '20px',
    };

    const logoStyle = {
        width: '30px',
        height: 'auto'
    };
    const rowStyle = {
      paddingBottom: '7px',
      paddingRight: '5px'
    };

    const prompt = this.props.prompt;

    return(
      <div style={backgroundStyle}>
      <div style={mediaStyle}>
      {this.hideAppHeader()}

          <div className="row">
            <div className="col alignL">
              <Stars
                gminder={this.props.gminder}
                />
            </div>
          <div className="col-8 alignR">
            <p className="header-font">Added {this.props.gminder.recordedDate} from Prompt Collection: {this.props.gminder.collection}</p>
          </div>
          </div>

          {this.props.gminder.promptID ?
          (<div className="media prompt">
            <div className="media-body">
              <p className="paragraph-font">{prompt.promptText}</p>
            </div>
          </div>)
          : null }
          <br />

          <div className="media answer">
          <div className="media-body">
          <br />
          <h4 className="paragraph-font">{this.props.gminder.mainResponse}</h4><br />
          </div>
          </div>

          { this.props.gminder.reason ?
            <div>
          <br />
          <div className="media reason">
          <div className="media-body paragraph-font">
          {this.props.gminder.reason}
          </div>
          </div>
        </div>
          : null}
          <br /><br />
          <div className="row header-font" style={rowStyle}>
            <div className="col alignL">
            <p>Made with care</p>
            </div>
            <div className="col-6">
            <p>Printed with <img src={goodminderLogo} alt="goodminderLogo" style={logoStyle}/> Goodminder</p>
            </div>
            <div className="col alignR">
            <div id="date">{this.getDate()}</div>
            </div>
          </div>
          <div className="row printPageButton">
            <div className="col col-12 col-sm-6">
              <button className='btn-primary btn printPageButton' type='button' onClick={() => window.print()}>
                Print</button>
            </div>
            <div className="col col-12 col-sm-6">
              <button className='btn-secondary btn printPageButton' type='button'
                onClick={() => {
                  this.showAppHeader();
                  this.props.changeHomeDisplay('goodminders');
                }}>
                Back</button>
            </div>
          </div>
      </div>
    </div>)
}
}

function mapStateToProps(state) {
  return {
    gminder: state.navigation.currentGM,
    prompt: state.navigation.currentPrompt
  }
}
export default connect(mapStateToProps, actions)(Print);
