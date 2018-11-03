import React from 'react';

// Utils
import Gminder from '../../../../../../Utils/Gminder';

//Add CSVDownload to import if want to use it
import {CSVLink} from 'react-csv';

// This is the front-end of a database manager.
// How you interact and change the database.
class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompts: [],
      collection: '',
      csvData: [],
      promptsShowing: [],
      sortBy: 'id',
      promptTableDisplay: 'promptTable'
    };
    // props
    this.changeDisplay = this.props.changeDisplay;
    this.collection = this.props.collection;

    // bind methods
    this.handleClick = this.handleClick.bind(this);
    this.promptTableDisplayChange = this.promptTableDisplayChange.bind(this);
  }

  componentDidMount() {
    // Get data from database
    // Prompts
    Gminder.getPrompts().then(res => this.setState({prompts: res.express})).catch(err => console.log(err)).then(() => {
    if (this.collection) {
      this.setState({collection: this.collection})
      }
    })
  }

  handleClick(event) {
    const myID = event.currentTarget.getAttribute('value');
    for (let i = 0; i < this.state.prompts.length; i++) {
      if (Number(myID) === Number(this.state.prompts[i].id)) {
        this.props.setPrompt(this.state.prompts[i]);
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
    this.state.prompts.forEach(prompt => {
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
          <hr />
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
            this.state.prompts.map((prompt, i) => {
              return (
                  <tr key={this.generateKey(i)}>
                    <th scope="row">{prompt.id}</th>
                    <td>{prompt.collection}</td>
                    <td>{prompt.promptText}</td>
                    <td>
                    <button className='clear-button' type='button' value={prompt.id} onClick={this.handleClick}><i className="fas fa-pencil-alt"></i></button>
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

export default Manager;
