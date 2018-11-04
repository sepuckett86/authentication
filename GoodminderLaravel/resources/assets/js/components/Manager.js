import React from 'react';

import Button from '../../Components/Button/Button';
import GminderTable from './Scenes/GminderTable/GminderTable';
import PromptTable from './Scenes/PromptTable/PromptTable';

// This is the front-end of a database manager.
// How you interact and change the database.
class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      managerDisplay: 'none',
      csvData: [],
    };
    // props
    this.changeDisplay = this.props.changeDisplay;
    this.setGminder = this.props.setGminder;

    // bind methods
    this.handleClick = this.handleClick.bind(this);
    this.changeManagerDisplay = this.changeManagerDisplay.bind(this);
  }

  handleClick(event) {
  }

  changeManagerDisplay(id) {
    this.setState({
      managerDisplay: id
    })
  }

  render() {
    return(
      <div className="container-fluid">
        <br />
        { this.state.managerDisplay === 'none' ?
        (<div>
          <Button
          name="Table of All Gminders"
          onClick={this.changeManagerDisplay}
          id="gminderTable"
          />

          <Button
          name="Table of All Prompts"
          id="promptTable"
          onClick={this.changeManagerDisplay}
          />
          <br />
          <Button
          id='random'
          name="Back"
          onClick={this.changeDisplay}
          />
        </div>) : null }

        { this.state.managerDisplay === 'gminderTable' ? (<div>
          <GminderTable
            setGminder={this.setGminder}
            changeDisplay={this.changeDisplay}/>
            <br />
          <Button
          name="Table of All Prompts"
          id="promptTable"
          onClick={this.changeManagerDisplay}
          />
          <br />

          <Button
            id='random'
          name="Back"
          onClick={this.changeDisplay}
          />

        </div>) : null }

        { this.state.managerDisplay === 'promptTable' ?
        (<div>
          <PromptTable
            collection={this.props.collection}
            setPrompt={this.props.setPrompt}
            changeDisplay={this.props.changeDisplay}
            changeType={this.props.changeType}/>
          <Button
          name="Table of All Gminders"
          onClick={this.changeManagerDisplay}
          id="gminderTable"
          />
          <br />
          <Button
            id='random'
          name="Back"
          onClick={this.changeDisplay}
          />

          <br />
        </div>) : null }

      </div>)
  }
}

export default Manager;
