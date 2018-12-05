import React from 'react';

import MediaQuery from "react-responsive";
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';

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
    if (event.currentTarget.name === 'create') {
      this.props.setCurrentPrompt({});
      this.props.changeHomeDisplay('promptCreateEdit');
    } else {
    const myID = event.currentTarget.getAttribute('value');
    for (let i = 0; i < this.props.prompts.length; i++) {
      if (Number(myID) === Number(this.props.prompts[i].id)) {
        this.props.setCurrentPrompt(this.props.prompts[i]);
      }
    }

    if (event.currentTarget.name === 'edit') {
      this.props.changeHomeDisplay('promptCreateEdit')
    }

    if (event.currentTarget.name === 'respond') {
      this.props.changeAddDisplay('prompt');
      this.props.changeHomeDisplay('add');
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
      <div>

        <div className="box">
        <div id="beginning">
          <h1>Manage Prompts</h1>
          <p>Here is where you can view and respond to all prompts and create and edit your own custom prompts</p>
          <hr />
          <Link to="/">
          <button name='create' className='btn btn-green' onClick={this.handleClick}>Create Prompt</button>
          </Link>
          <br />
          <br />
          <div className="row justify-content-center">
            <div className="col col-12 col-sm-6">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label
                    className="input-group-text dropLabel"
                    htmlFor="filter"
                  >
                    Show
                  </label>
                </div>
                <select
                  onChange={this.handleSelect}
                  className="custom-select"
                  id="filter"
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  <option disabled="disabled">----</option>
                  <option value="5">Yours</option>
                  <option value="4">Other</option>
                </select>
              </div>
            </div>

            <div className="col">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label
                    className="input-group-text dropLabel"
                    htmlFor="inputGroupSelect01"
                  >
                    Sort by
                  </label>
                </div>
                <select
                  onChange={this.handleSelect}
                  className="custom-select"
                  id="sort"
                  defaultValue="id"
                >
                  <option value="id">ID</option>
                  <option value="category">Category</option>
                  <option value="rating">Rating</option>
                  <option value="author">Author</option>
                </select>
              </div>
            </div>
          </div>
          <a href="#end">Scroll to bottom</a>
          {/* MediaQuery for large screen */}
          <MediaQuery query="(min-width: 576px)">
          <table className="table table-striped" style={{'textAlign': 'left'}}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Collection</th>
                <th scope="col">Prompt</th>
                <th scope="col">Edit</th>
                <th scope="col">Respond</th>

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
                    <Link to="/">
                    <button className='btn-flat btn-blue' type='button' name='edit' value={prompt.id} onClick={this.handleClick}><i className="fas fa-edit"></i></button>
                    </Link>
                    </td>

                    <td>
                    <Link to="/">
                    <button className='btn-flat btn-blue' type='button' name='respond' value={prompt.id} onClick={this.handleClick}><i className="fas fa-pencil-alt"></i></button>
                    </Link>
                    </td>
                  </tr>
              )
            })
          }
        </tbody>
        </table>
        </MediaQuery>

        {/* MediaQuery for small screen */}
        <MediaQuery query="(max-width: 575px)">
        <table className="table table-striped" style={{'textAlign': 'left'}}>
          <thead>
            <tr>
              <th scope="col">Prompt</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
        {
          this.props.prompts.map((prompt, i) => {
            return (
                <tr key={this.generateKey(i)}>
                  <td scope="row">{prompt.promptText}</td>
                  <td>
                  <Link to="/">
                  <button className='btn-flat btn-blue' type='button' name='edit' value={prompt.id} onClick={this.handleClick}><i className="fas fa-edit"></i></button>
                  </Link>
                  </td>

                  <td>
                  <Link to="/">
                  <button className='btn-flat btn-blue' type='button' name='respond' value={prompt.id} onClick={this.handleClick}><i className="fas fa-pencil-alt"></i></button>
                  </Link>
                  </td>
                </tr>
            )
          })
        }
      </tbody>
      </table>
      </MediaQuery>

        <CSVLink data={this.makeCSVArrayPrompts()}>
        <button className="btn btn-green" type="button">
          Download CSV of all data
        </button>
        </CSVLink>
        <br />
        <a id='end' href="#beginning">Scroll to top</a>
        <MediaQuery query="(max-width: 576px)">
          <hr />
        </MediaQuery>
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
