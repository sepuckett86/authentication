import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

/*
Blurb requirements

Create the cover last after your final page count is known
Use the correct dimensions for files
Files must have an even number of pages
Design your book with a single page on the right, followed by two-page spreads, and ending with a single page on the left
Page counts for 5x8 and 6x9 books must be divisible by six
Use only 100% black ink for text
Do not use spot or registration color
For advanced users, fine tune colors with our ICC profile
Rasterize overly complex vectors (e.g. Illustrator or CAD art)
For full-bleed printing, stretch images to the page's edge
*/


class Pdf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gminders: this.props.gminders,
      prompts: this.props.prompts,
      inputPageSize: '',
      inputTitle: '',
      inputAuthor: '',
      checkboxTitle: false,
      checkboxAuthor: false,
      radioFont: 'font1',
      checkboxRating1: true,
      checkboxRating2: true,
      checkboxRating3: true,
      checkboxRating4: true,
      checkboxRating5: true,
      checkboxRating0: true,
      checkboxTypePrompt: true,
      checkboxTypeQuote: true,
      checkboxTypeCustom: true,
      radioOrder: 'chronological'
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  componentDidMount() {
    // Get data from database
    this.props.getGoodminders(() => {
      this.props.getPrompts(() => {
      })
    })
  }

  handleClick(event) {
    if (event.target.id === "make-PDF") {
      this.makePDF();
    }
    if (event.target.id === "checkAllRatings") {
      if (this.state.checkboxRating1 && this.state.checkboxRating2 &&
        this.state.checkboxRating3 && this.state.checkboxRating4 &&
        this.state.checkboxRating5 && this.state.checkboxRating0) {
          this.setState({
            checkboxRating1: false,
            checkboxRating2: false,
            checkboxRating3: false,
            checkboxRating4: false,
            checkboxRating5: false,
            checkboxRating0: false,
          })

        } else {
          this.setState({
            checkboxRating1: true,
            checkboxRating2: true,
            checkboxRating3: true,
            checkboxRating4: true,
            checkboxRating5: true,
            checkboxRating0: true,
          })
        }
    }
    if (event.target.id === "checkAllTypes") {
      if (this.state.checkboxTypePrompt && this.state.checkboxTypeQuote &&
        this.state.checkboxTypeCustom) {
          this.setState({
            checkboxTypePrompt: false,
            checkboxTypeQuote: false,
            checkboxTypeCustom: false,
          })

        } else {
          this.setState({
            checkboxTypePrompt: true,
            checkboxTypeQuote: true,
            checkboxTypeCustom: true,
          })
        }

    }
  }

  handleChange(event) {
    if (event.target.id === "title") {
      this.setState({inputTitle: event.target.value})
      if (event.target.value) {
        this.setState({checkboxTitle: true})
      } else {
        this.setState({checkboxTitle: false})
      }
    }
    if (event.target.id === "author") {
      this.setState({inputAuthor: event.target.value});
      if (event.target.value) {
        this.setState({checkboxAuthor: true})
      } else {
        this.setState({checkboxAuthor: false})
      }
    }
  }

  handleCheck(event) {
    if (event.target.id === "checkboxTitle") {
      this.setState({checkboxTitle: !this.state.checkboxTitle});

    }
    if (event.target.id === "checkboxAuthor") {
      this.setState({checkboxAuthor: !this.state.checkboxAuthor});

    }
    if (event.target.id === "ratingCheck1") {
      this.setState({checkboxRating1: !this.state.checkboxRating1});

    }
    if (event.target.id === "ratingCheck2") {
      this.setState({checkboxRating2: !this.state.checkboxRating2});

    }
    if (event.target.id === "ratingCheck3") {
      this.setState({checkboxRating3: !this.state.checkboxRating3});

    }
    if (event.target.id === "ratingCheck4") {
      this.setState({checkboxRating4: !this.state.checkboxRating4});

    }
    if (event.target.id === "ratingCheck5") {
      this.setState({checkboxRating5: !this.state.checkboxRating5});

    }
    if (event.target.id === "ratingCheck0") {
      this.setState({checkboxRating0: !this.state.checkboxRating0});

    }
    if (event.target.id === "typeCheck1") {
      this.setState({checkboxTypePrompt: !this.state.checkboxTypePrompt});

    }
    if (event.target.id === "typeCheck2") {
      this.setState({checkboxTypeQuote: !this.state.checkboxTypeQuote});

    }
    if (event.target.id === "typeCheck3") {
      this.setState({checkboxTypeCustom: !this.state.checkboxTypeCustom});

    }
  }

  handleRadio(event) {
    if (event.target.name === 'fontRadio') {
      this.setState({radioFont: event.target.value});
    }
    if (event.target.name === 'orderRadio') {
      this.setState({radioOrder: event.target.value});
    }
  }

  // From Stack Overflow
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }

  makeSelectedGminders() {
    const gminders = this.state.gminders;
    const ratings = [this.state.checkboxRating0, this.state.checkboxRating1, this.state.checkboxRating2,
    this.state.checkboxRating3, this.state.checkboxRating4, this.state.checkboxRating5];
    const types = {
      prompt: this.state.checkboxTypePrompt,
      quote: this.state.checkboxTypeQuote,
      custom: this.state.checkboxTypeCustom
    };
    let selectedGminders = [];
    gminders.forEach(gminder => {
      if (ratings[gminder.rating] && types[gminder.category]) {
        selectedGminders.push(gminder);
      }
    })
    // Sort
    // Order: Chronological
    if (this.state.radioOrder === 'chronological') {
      //
    }
    // Order: random
    if (this.state.radioOrder === 'random') {
      const shuffledArray = this.shuffleArray(selectedGminders);
      selectedGminders = shuffledArray;
    }
    // Order: by type, then chronological
    if (this.state.radioOrder === 'byTypeChronological') {
      let promptArray = [];
      let quoteArray = [];
      let customArray = [];
      let sortedArray = [];
      selectedGminders.forEach(gminder => {
        switch(gminder.category) {
          case 'prompt':
            promptArray.push(gminder);
            break;
          case 'quote':
            quoteArray.push(gminder);
            break;
          case 'custom':
            customArray.push(gminder);
            break;
          default:
            sortedArray.push(gminder);
        }
      })
      sortedArray = sortedArray.concat(promptArray);
      sortedArray = sortedArray.concat(quoteArray);
      sortedArray = sortedArray.concat(customArray);
      selectedGminders = sortedArray;
    }
    // Order: by type, then random
    if (this.state.radioOrder === 'byTypeRandom') {
      let promptArray = [];
      let quoteArray = [];
      let customArray = [];
      let sortedArray = [];
      selectedGminders.forEach(gminder => {
        switch(gminder.category) {
          case 'prompt':
            promptArray.push(gminder);
            break;
          case 'quote':
            quoteArray.push(gminder);
            break;
          case 'custom':
            customArray.push(gminder);
            break;
          default:
            sortedArray.push(gminder);
        }
      })
      promptArray = this.shuffleArray(promptArray);
      quoteArray = this.shuffleArray(quoteArray);
      customArray = this.shuffleArray(customArray);
      sortedArray = sortedArray.concat(promptArray);
      sortedArray = sortedArray.concat(quoteArray);
      sortedArray = sortedArray.concat(customArray);
      selectedGminders = sortedArray;
    }
    return selectedGminders;
  }

  makeCredit(gminder) {
    const quote = gminder;
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
      return false;
    }
    if (quote.who && !quote.source && quote.author) {
      return `-- ${quote.who}, from a work by ${quote.author}`;
    }
    if (quote.who && !quote.source && !quote.author) {
      return `-- ${quote.who}`;
    }
    if (quote.who && quote.source && !quote.author) {
      return `-- ${quote.who}, ${quote.source}`;
    }
  }

  makePDF() {
    const jsPDF = require('jspdf');
    var doc = new jsPDF('p', 'cm', [13, 20])
    var sizes = [16]
    var fonts = [
      ['Helvetica', '']
    ];
    var font;
    var size;
    var lines;
    var margin = 4;
    var verticalOffset = margin;
    var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id eros turpis. Vivamus tempor urna vitae sapien mollis molestie. Vestibulum in lectus non enim bibendum laoreet at at libero. Etiam malesuada erat sed sem blandit in varius orci porttitor. Sed at sapien urna. Fusce augue ipsum, molestie et adipiscing at, varius quis enim. Morbi sed magna est, vel vestibulum urna. Sed tempor ipsum vel mi pretium at elementum urna tempor. Nulla faucibus consectetur felis, elementum venenatis mi mollis gravida. Aliquam mi ante, accumsan eu tempus vitae, viverra quis justo.\n\nProin feugiat augue in augue rhoncus eu cursus tellus laoreet. Pellentesque eu sapien at diam porttitor venenatis nec vitae velit. Donec ultrices volutpat lectus eget vehicula. Nam eu erat mi, in pulvinar eros. Mauris viverra porta orci, et vehicula lectus sagittis id. Nullam at magna vitae nunc fringilla posuere. Duis volutpat malesuada ornare. Nulla in eros metus. Vivamus a posuere libero.'

    // Assign font
    switch(this.state.radioFont) {
      case 'font1':
        font = 'Times';
        break;
      case 'font2':
        font = 'Helvetica';
        break;
      case 'font3':
        font = 'Courier';
        break;
      default:
        font = 'Times';
        break;
    }

    // Insert title page
    if (this.state.checkboxTitle || this.state.checkboxAuthor) {
      size = 24;
      if (this.state.checkboxTitle) {
        text = this.state.inputTitle;
      } else {
        text = '';
      }

      lines = doc.setFont(font).setFontSize(size).splitTextToSize(text, 11);
      // This code puts the text on the document.
      doc.text(1, verticalOffset + size / 72, lines);


      // Check for author
      if (this.state.checkboxAuthor) {
        size = 16;
        text = this.state.inputAuthor;
        lines = doc.setFont(font).setFontSize(size).splitTextToSize(text, 11);
        verticalOffset += (lines.length * 4) * size / 72;
        doc.text(1, verticalOffset + size / 72, lines);
      }
      doc.addPage();
      verticalOffset = margin;
    }

    const myGminderList = this.makeSelectedGminders();
    // Cycle through all gminders
    for (let j = 0; j < myGminderList.length; j++) {
      const gminder = myGminderList[j];
      for (var i in fonts) {
        if (fonts.hasOwnProperty(i)) {
          size = sizes[i]
          // Determine output based on category
          if (gminder.category === 'prompt') {
          // Prompt
            // get prompt text
            let promptText = gminder.promptText
            text = promptText;
            lines = doc.setFont(font).setFontSize(size).splitTextToSize(text, 11);
            // This code puts the text on the document.
            doc.text(1, verticalOffset + size / 72, lines);
            // This code adjusts vertical placement of next text to prevent overlapping
            verticalOffset += (lines.length * 4) * size / 72;

          // Main Response
            text = gminder.mainResponse;
            lines = doc.setFont(font).setFontSize(size).splitTextToSize(text, 11);
            // This code puts the text on the document.
            doc.text(1, verticalOffset + size / 72, lines)
            // This code adjusts vertical placement of next text to prevent overlapping
            verticalOffset += (lines.length * 4) * size / 72;

          // Reason
          if (gminder.reason) {
            text = gminder.reason;
            lines = doc.setFont(font).setFontSize(size).splitTextToSize(text, 11);
            // This code puts the text on the document.
            doc.text(1, verticalOffset + size / 72, lines)
            // Reset vertical Offset for next page
            verticalOffset = margin;
          }
          }

          if (gminder.category === 'quote') {
            // Main Response
            text = '"' + gminder.mainResponse + '"';
            lines = doc.setFont(font).setFontSize(size).splitTextToSize(text, 11)
            // This code puts the text on the document.
            doc.text(1, verticalOffset + size / 72, lines)
            verticalOffset += (lines.length * 4) * size / 72;
            // Credit
            const credit = this.makeCredit(gminder);
            // If there is a credit
            if (credit) {
              const creditLines = doc.setFont(font).setFontSize(size).splitTextToSize(credit, 11)
              // This code puts the text on the document.
              doc.text(1, verticalOffset + size / 72, creditLines)
            }

            // Reset vertical Offset for next page
            verticalOffset = margin;
          }
          if (gminder.category === 'custom') {
            text = gminder.mainResponse;
            lines = doc.setFont(font).setFontSize(size).splitTextToSize(text, 11);
            // This code puts the text on the document.
            doc.text(1, verticalOffset + size / 72, lines)
            // Reset vertical Offset for next page
            verticalOffset = margin;
          }

        }
      }
      if (j < myGminderList.length - 1) {
        // make new page if not last gminder
        doc.addPage();
      }

    }

    doc.save('small_tradebook.pdf')

  }
  render() {
    const courier = {
      fontFamily: 'courier'
    };
    const helvetica = {
      fontFamily: 'helvetica'
    };
    const times = {
      fontFamily: 'times'
    };
    const small = {
      fontSize: '16px'
    };
    const medium = {
      fontSize: '24px'
    };
    const large = {
      fontSize: '36px'
    };

    return (<div>
      <br />
      <div className='container'>
        <div className='box'>
        <h1>Customize PDF</h1>
        <form className='alignL'>
          <div className="form-group">
            <h4>Title</h4>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input id='checkboxTitle' type="checkbox" onChange={this.handleCheck} checked={this.state.checkboxTitle} aria-label="Checkbox for following text input"/>
                </div>
              </div>
              <input type="text" value={this.state.inputTitle} onChange={this.handleChange} className="form-control" id="title" placeholder="optional - this creates a title page"/>
            </div>
          </div>
          <div className="form-group">
            <h4>Author</h4>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input id='checkboxAuthor' type="checkbox" onChange={this.handleCheck} checked={this.state.checkboxAuthor} aria-label="Checkbox for following text input"/>
                </div>
              </div>
              <input type="text" value={this.state.inputAuthor} onChange={this.handleChange} className="form-control" id="author" placeholder="optional - this creates an author on the title page"/>
            </div>
          </div>
          <div className='row justify-content-between'>
            <div className='col'>
              <h4>Page Size</h4>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="sizeRadio" id="sizeRadio1" value="option1" defaultChecked/>
                <label className="form-check-label" htmlFor="inlineRadio1">5×8 in, 13×20 cm</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="sizeRadio" id="sizeRadio2" value="option2" disabled/>
                <label className="form-check-label" htmlFor="inlineRadio2">6×9 in, 15×23 cm</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="sizeRadio" id="sizeRadio3" value="option3" disabled/>
                <label className="form-check-label" htmlFor="inlineRadio3">8×10 in, 20×25 cm</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="sizeRadio" id="sizeRadio4" value="option4" disabled/>
                <label className="form-check-label" htmlFor="inlineRadio4">8.5×11 in, 21.59×27.94 cm</label>
              </div>
              <br/>
            </div>
            <div className='col'>
              <h4>Font</h4>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="fontRadio" id="fontRadioTimes" value="font1" onChange={this.handleRadio} checked={this.state.radioFont === 'font1'}/>
                <label className="form-check-label" htmlFor="inlineRadio1" style={times}>Times</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="fontRadio" id="fontRadioHelvetica" value="font2" onChange={this.handleRadio} checked={this.state.radioFont === 'font2'}/>
                <label className="form-check-label" htmlFor="inlineRadio2" style={helvetica}>Helvetica</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="fontRadio" id="fontRadioCourier" value="font3" onChange={this.handleRadio} checked={this.state.radioFont === 'font3'}/>
                <label className="form-check-label" htmlFor="inlineRadio3" style={courier}>Courier</label>
              </div>
              <br/>
            </div>
            <div className='col'>
              <h4>Font Size</h4>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="fontSizeRadio" id="fontSizeRadio1" value="fontSize1" disabled/>
                <label className="form-check-label" htmlFor="inlineRadio1" style={small}>Small</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="fontSizeRadio" id="fontSizeRadio2" value="fontSize2" defaultChecked="defaultChecked"/>
                <label className="form-check-label" htmlFor="inlineRadio2" style={medium}>Medium</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="fontSizeRadio" id="fontSizeRadio3" value="fontSize3" disabled/>
                <label className="form-check-label" htmlFor="inlineRadio3" style={large}>Large</label>
              </div>
              <br/>
            </div>
          </div>
          <hr />
          {/* end row */}
          <h1 style={{'textAlign': 'center'}}>Content - Goodminders</h1>
          <br/>
          <div className='row justify-content-between'>
            <div className='col'>
              <h4>By Rating</h4>
              <button type="button" id="checkAllRatings" onClick={this.handleClick} className='btn btn-green'>Check All
              </button>
              <div className="form-check">
                <input className="form-check-input" onChange={this.handleCheck} type="checkbox" value="" id="ratingCheck5" checked={this.state.checkboxRating5}/>
                <label className="form-check-label" htmlFor="ratingCheck1">
                  5 stars
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" onChange={this.handleCheck} type="checkbox" value="" id="ratingCheck4" checked={this.state.checkboxRating4}/>
                <label className="form-check-label" htmlFor="ratingCheck2">
                  4 stars
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" onChange={this.handleCheck} type="checkbox" value="" id="ratingCheck3" checked={this.state.checkboxRating3}/>
                <label className="form-check-label" htmlFor="ratingCheck3">
                  3 stars
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" onChange={this.handleCheck} type="checkbox" value="" id="ratingCheck2" checked={this.state.checkboxRating2}/>
                <label className="form-check-label" htmlFor="ratingCheck4">
                  2 stars
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" onChange={this.handleCheck} type="checkbox" value="" id="ratingCheck1" checked={this.state.checkboxRating1}/>
                <label className="form-check-label" htmlFor="ratingCheck5">
                  1 stars
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" onChange={this.handleCheck} type="checkbox" value="" id="ratingCheck0" checked={this.state.checkboxRating0}/>
                <label className="form-check-label" htmlFor="ratingCheck0">
                  0 stars
                </label>
              </div>
              <br/>
            </div>
            <div className='col'>
              <h4>By Type</h4>
              <button type="button" id='checkAllTypes' onClick={this.handleClick} className='btn btn-green'>Check All
              </button>
              <div className="form-check">
                <input className="form-check-input" onChange={this.handleCheck} type="checkbox" value="" id="typeCheck1" checked={this.state.checkboxTypePrompt}/>
                <label className="form-check-label" htmlFor="typeCheck1">
                  Prompt
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" onChange={this.handleCheck} type="checkbox" value="" id="typeCheck2" checked={this.state.checkboxTypeQuote}/>
                <label className="form-check-label" htmlFor="typeCheck2">
                  Quote
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" onChange={this.handleCheck} type="checkbox" value="" id="typeCheck3" checked={this.state.checkboxTypeCustom}/>
                <label className="form-check-label" htmlFor="typeCheck3">
                  Custom
                </label>
              </div>
              <br/>
            </div>
            <div className='col'>
              <h4>Order</h4>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="orderRadio" id="orderRadio1" value="chronological" onChange={this.handleRadio} checked={this.state.radioOrder === 'chronological'} />
                <label className="form-check-label" htmlFor="orderRadio1">Chronological</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="orderRadio" id="orderRadio2" value="random" onChange={this.handleRadio} checked={this.state.radioOrder === 'random'}/>
                <label className="form-check-label" htmlFor="orderRadio2">Random</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="orderRadio" id="orderRadio3" value="byTypeChronological" onChange={this.handleRadio} checked={this.state.radioOrder === 'byTypeChronological'}/>
                <label className="form-check-label" htmlFor="orderRadio3">By type, chronological within</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="orderRadio" id="orderRadio4" value="byTypeRandom" onChange={this.handleRadio} checked={this.state.radioOrder === 'byTypeRandom'}/>
                <label className="form-check-label" htmlFor="orderRadio4">By type, random within</label>
              </div>
              <br/>
            </div>
          </div>
          <br/>
          { /*
          <div className='row'>
            <div className='col col-12 col-md-4'>
              <h4>Max Pages</h4>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="maxPageRadio" id="maxPageRadio1" value="maxPage1" defaultChecked="defaultChecked"/>
                <label className="form-check-label" htmlFor="maxPageRadio1">Include all selected goodminders</label>

              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="maxPageRadio" id="maxPageRadio2" value="maxPage2"/>
                <label className="form-check-label" htmlFor="maxPageRadio2">{' '}{' '}
                  <input type="text" className="form-control form-control-sm" aria-label="Text input with radio button" placeholder='enter max pages here'/>
                </label>
              </div>
            </div>
            <div className='col col-12 col-md-4'>
              <h4>X</h4>
            </div>
            <div className='col col-12 col-md-4'>
              <h4>Y</h4>
            </div>
          </div>
          */}
        </form>
        <div style={{textAlign:'center'}}>
        <p>{' '}Total pages (not including title page): <b>{this.makeSelectedGminders().length}</b></p>
        <button id="make-PDF"  className='btn btn-green' onClick={this.handleClick}>Make PDF</button>
      </div>
      </div>
      <br />
      <button
      id='random'
      name="Back"
      className='btn btn-custom'
      onClick={() => this.props.changeHomeDisplay('goodminders')}>
      <i className="fas fa-home"></i>{' '}Back to Home</button>

      <br />
      <br />
      <br />
      </div>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    gminders: state.goodminders,
    prompts: state.prompts
  }
}

export default connect(mapStateToProps, actions)(Pdf);
