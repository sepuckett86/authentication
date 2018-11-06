import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

//Add CSVDownload to import if want to use it
import {CSVLink} from 'react-csv';

class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: [],
      prompt: {}
    };

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(event) {
  if(event.target.getAttribute('value') === 'respond') {
    let prompt = event.target.getAttribute('prompt');
    this.setState({
      display: 'add',
      prompt: prompt
    })
  }
  }

  generateKey(index) {
    return `${ index }_${ new Date().getTime() }`;
  }

  makeCSVArray() {
    let myArray = [['ID', 'Category', 'Collection', 'Date', 'Prompt', 'Answer', 'Reason', 'Author', 'Stars']];
    this.props.gms.forEach(gminder => {
      let innerArray = [gminder.id, gminder.category, gminder.collection, gminder.date, gminder.prompt, gminder.answer, gminder.reason, gminder.author, gminder.stars];
      myArray.push(innerArray);
    })
    return myArray;
  }

  makeCSVArrayPrompts() {
    let myArray = [['ID', 'Collection', 'Prompt']];
    this.props.prompts.forEach(prompt => {
      let innerArray = [prompt.id, prompt.collection, prompt.prompt];
      myArray.push(innerArray);
    })
    return myArray;
  }

  shortenGminder(gminder) {
    if(gminder.length > 100){
      let short = gminder.slice(0,100);
      short = short.concat('...');
      gminder = short;
    }
    return gminder
  }

  displayAuthor(gminder) {
    if(gminder.author) {
      return (
        <div>--{gminder.author}</div>
      )
    }
  }

  render() {
    return(
      <div className="container">

        { this.state.display === 'gminderTable' ?
      (<div className="box">
        <div id="gminders">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>

                <th scope="col">Category</th>
                <th scope="col">Stars</th>
                <th scope="col">Gminder</th>
                <th scope="col">Edit</th>

              </tr>
            </thead>
            <tbody>
          {
            this.props.gms.map((gminder, i) => {
              return (
                  <tr key={this.generateKey(i)}>
                    <th scope="row">{gminder.id}</th>

                    <td>{gminder.category}</td>
                    <td>{gminder.stars}</td>
                    <td>
                      {this.shortenGminder(gminder.answer)}
                      {this.displayAuthor(gminder)}
                    </td>
                    <td>
                  Edit
                    </td>
                  </tr>
              )
            })
          }

        </tbody>
        </table>
        <CSVLink data={this.makeCSVArray()} >Download CSV of all data</CSVLink>
      </div>
    </div>)
        : null }

        { this.state.display === 'promptTable' ?
        (<div className="box">
        <div id="prompts">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Collection</th>
                <th scope="col">Prompt</th>
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
                    <td>{prompt.prompt}</td>
                    <td>
                    <button onClick={this.handleClick} prompt={prompt} value="respond">Respond</button>
                    </td>
                  </tr>
              )
            })
          }
        </tbody>
        </table>
        <CSVLink data={this.makeCSVArrayPrompts()} >Download CSV of all data</CSVLink>
        </div>
        </div>)
        : null }


        <br />

        <button
        name="Manage Database"
        onClick={() => this.props.changeHomeDisplay('manager')}
        id="manager"
        >Manage Database</button>

        <button
        name="Create PDF"
        onClick={() => this.props.changeHomeDisplay('pdf')}
        id="PDF"
        >Create PDF</button>

        <br />
        <button
          id='random'
        name="Back"
        onClick={() => this.props.changeHomeDisplay('goodminders')}
        >Return to Home</button>

        <br />
        <br />
        <br />
      </div>)
  }
}

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps, actions)(More);
