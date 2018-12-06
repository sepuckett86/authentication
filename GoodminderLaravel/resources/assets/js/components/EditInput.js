import React from 'react';
import onClickOutside from "react-onclickoutside";

class EditInput extends React.Component {

  handleClickOutside() {
    this.props.closeEditBoxes();
  }

  renderInput(type) {
    if (type === 'editAnswer') {
        const inputStyle = {
          'fontSize': '24px',
          'textAlign': 'center'
        }
        return (<div><textarea
          className="form-control paragraph-font"
          value={this.props.inputAnswer}
          onChange={this.props.handleChange}
          id="custom-answer"
          style={inputStyle}
          rows={3}
          />
          </div>)
      }
    if (type === 'editCollection') {
        return(

              <input type="text" className="form-control" value={this.props.inputCollection}
              onChange={this.props.handleChange} id="custom-collection"
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
