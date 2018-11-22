import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

//Add CSVDownload to import if want to use it
import {CSVLink} from 'react-csv';

// This is the front-end of a database manager.
// How you interact and change the database.
class PromptTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: [],
      promptsShowing: [],
      sortBy: 'id',
      promptTableDisplay: 'promptTable'
    };
    // props
    this.changeDisplay = this.props.changeDisplay;

    // bind methods
    this.handleClick = this.handleClick.bind(this);
    this.promptTableDisplayChange = this.promptTableDisplayChange.bind(this);
  }

  componentDidMount() {
    // Get data from database
    // Prompts
    this.props.getPrompts(() => {
    })
  }

  handleClick(event) {
    const myID = event.currentTarget.getAttribute('value');
    for (let i = 0; i < this.props.prompts.length; i++) {
      if (Number(myID) === Number(this.props.prompts[i].id)) {
        this.props.setPrompt(this.props.prompts[i]);
        this.props.changeType('prompt');
        this.props.changeDisplay('add');
      }
    }
  }

  promptTableDisplayChange() {
    this.setState({promptTableDisplay: 'addPrompt'})
  }

  generateKey(index) {
    return `${ index }_${ new Date().getTime() }`;
  }

  makeCSVArrayPrompts() {
    let myArray = [['ID', 'Collection', 'Prompt']];
    this.props.prompts.forEach(prompt => {
      let innerArray = [prompt.id, prompt.collection, prompt.promptText];
      myArray.push(innerArray);
    })
    return myArray;
  }

  render() {
    return(
      <div className="container">

        <div className="box">
        <div id="prompts">
          <h1>Manage Prompts</h1>
          <p>Here is where you can view, create, and edit your own custom prompts</p>
          <hr />
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Collection</th>
                <th scope="col">Prompt</th>
                <th scope="col">Edit</th>

              </tr>
            </thead>
            <tbody>
          {
            this.props.prompts.map((prompt, i) => {
              return (
                  <tr key={this.generateKey(i)}>
                    <th scope="row">{prompt.id}</th>
                    <td>{prompt.collection}</td>
                    <td>{prompt.promptText}</td>
                    <td>
                    <button className='btn-flat btn-blue' type='button' value={prompt.id} onClick={this.handleClick}><i className="fas fa-pencil-alt"></i></button>
                    </td>
                  </tr>
              )
            })
          }
        </tbody>
        </table>
        <CSVLink data={this.makeCSVArrayPrompts()} >Download CSV of all data</CSVLink>
        </div>
        </div>

        <br />
        <br />

      </div>)
  }
}

function mapStateToProps(state) {
  return {
    gminders: state.goodminders,
    prompts: state.prompts,
    collection: state.navigation.collection
  }
}

export default connect(mapStateToProps, actions)(PromptTable);
