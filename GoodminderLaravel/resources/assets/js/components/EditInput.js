import React from 'react';
import onClickOutside from "react-onclickoutside";

class EditInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClickOutside() {
    this.props.closeEditBoxes();
  }

  // When return key is pressed in text box, trigger search click event
  handleKeyDown(event) {
    // 13 is the number for enter key, still want to allow shift + enter for next line
    if (event.keyCode === 13 && !event.shiftKey) {
      this.props.closeEditBoxes();
    }
  }

  renderInput(type) {
    // #B37D46 rgb(179, 125, 70)
    // #B3467D rgb(179, 70, 125)
    // #C8C8C8 rgb(200, 200, 200)
    // #828282 rgb(130, 130, 130)
    // #A0E0E0 rgb(160, 224, 224)
    // #46B3B3 rgb(70, 179, 179)


    const editStyle = {
      backgroundColor: '#828282'
    }

    if (type === 'editAnswer') {
        const inputStyle = {
          'fontSize': '24px',
          'textAlign': 'center',
          
        }
        return (<div><textarea
          className="form-control paragraph-font"
          value={this.props.inputAnswer}
          onChange={this.props.handleChange}
          id="custom-answer"
          onKeyDown={this.handleKeyDown}
          style={inputStyle}
          rows={3}
          />
          </div>)
      }
    if (type === 'editCollection') {
        return(

              <input type="text" className="form-control" value={this.props.inputCollection}
              onChange={this.props.handleChange} onKeyDown={this.handleKeyDown} id="custom-collection"
              aria-describedby="editCollection"/>
      )
      }
  }
  render() {
    const type = this.props.type;
    return(
      <span>
        {this.renderInput(type)}
      </span>
    )
  }
}

export default onClickOutside(EditInput);
