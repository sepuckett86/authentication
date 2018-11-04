import React from 'react';
// mport Table from '../../Components/Table/Table';
import './GminderTable.css';

import MediaQuery from 'react-responsive';

// Utils
import Gminder from '../../../../../../Utils/Gminder';

//Add CSVDownload to import if want to use it
import {CSVLink} from 'react-csv';

// This is the front-end of a database manager.
// How you interact and change the database.
class GminderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gminders: [],
      prompts: [],
      csvData: [],
      gmindersShowing: [],
      sortBy: 'id'
    };

    // bind methods
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.setGmindersShowing = this.setGmindersShowing.bind(this);
  }

  componentDidMount() {
    // Get data from database
    Gminder.getGminders().then(res => this.setState({gminders: res.express})).catch(err => console.log(err)).then(() => {
      Gminder.getPrompts().then(res => this.setState({prompts: res.express})).catch(err => console.log(err)).then(() => {
        this.setGmindersShowing('all');
      })
    })
  }

  setGmindersShowing(filter) {
    if (filter === 'all') {
      this.setState({gmindersShowing: this.state.gminders})
    }
    if (filter === 'quote') {
      let filtered = this.state.gminders.filter(gminder => {return(gminder.category === 'quote')});
      this.setState({gmindersShowing: filtered})
    }
    if (filter === 'prompt') {
      let filtered = this.state.gminders.filter(gminder => {return(gminder.category === 'prompt')});
      this.setState({gmindersShowing: filtered})
    }
    if (filter === 'custom') {
      let filtered = this.state.gminders.filter(gminder => {return(gminder.category === 'custom')});
      this.setState({gmindersShowing: filtered})
    }
    if (filter === '5') {
      let filtered = this.state.gminders.filter(gminder => {return(gminder.rating === 5)});
      this.setState({gmindersShowing: filtered})
    }
    if (filter === '4') {
      let filtered = this.state.gminders.filter(gminder => {return(gminder.rating === 4)});
      this.setState({gmindersShowing: filtered})
    }
    if (filter === '3') {
      let filtered = this.state.gminders.filter(gminder => {return(gminder.rating === 3)});
      this.setState({gmindersShowing: filtered})
    }
    if (filter === '2') {
      let filtered = this.state.gminders.filter(gminder => {return(gminder.rating === 2)});
      this.setState({gmindersShowing: filtered})
    }
    if (filter === '1') {
      let filtered = this.state.gminders.filter(gminder => {return(gminder.rating === 1)});
      this.setState({gmindersShowing: filtered})
    }
    if (filter === '0') {
      let filtered = this.state.gminders.filter(gminder => {return(gminder.rating === 0)});
      this.setState({gmindersShowing: filtered})
    }
  }

  handleClick(event) {

    const myID = event.currentTarget.getAttribute('value');
    for (let i = 0; i < this.state.gminders.length; i++) {
      if (Number(myID) === Number(this.state.gminders[i].id)) {
        this.props.setGminder(this.state.gminders[i]);
        this.props.changeDisplay('edit');
      }
    }

  }

  handleSelect(event) {
    if (event.target.id === 'filter') {
      this.setGmindersShowing(event.target.value);
    }
  }

  generateKey(index) {
    return `${ index }_${ new Date().getTime() }`;
  }

  makeCSVArray() {
    let myArray = [['ID', 'Category', 'Collection', 'Date', 'Prompt', 'Answer', 'Reason', 'Author', 'Stars']];
    this.state.gminders.forEach(gminder => {
      let innerArray = [gminder.id, gminder.category, gminder.collection, gminder.date, this.getPromptWithId(gminder.promptID), gminder.mainResponse, gminder.reason, gminder.author, gminder.rating];
      myArray.push(innerArray);
    })
    return myArray;
  }

  getPromptWithId(id) {
    id = Number(id);
    for (let i = 0; i < this.state.prompts.length; i++) {
      if (this.state.prompts[i].id === id) {
        return this.state.prompts[i];
      }
    }
  }

  shortenGminder(gminder) {
    if(gminder.length > 100){
      let short = gminder.slice(0,100);
      short = short.concat('...');
      gminder = short;
    }
    return gminder
  }

  displayAuthor(quote) {
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
      return null;
    }
    if (quote.who && !quote.source && quote.author) {
      return `-- ${quote.who}, from a work by ${quote.author}`;
    }
    if (quote.who && !quote.source && !quote.author) {
      return `-- ${quote.who}`;
    }
  }

  render() {

    return(
      <div id='beginning' className="box">
        <div  >
          <h1 >Manage Goodminders</h1>
          <hr />
          <div className='row justify-content-center'>
            <div className='col col-12 col-sm-6'>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text dropLabel" htmlFor="filter">Show</label>
              </div>
              <select onChange={this.handleSelect} className="custom-select" id="filter" defaultValue='all'>
                <option value="all">All</option>
                <option disabled="disabled">----</option>
                <option disabled="disabled">By category</option>
                <option disabled="disabled">----</option>
                <option value="prompt">Prompt</option>
                <option value="quote">Quote</option>
                <option value="custom">Custom</option>
                <option disabled="disabled">----</option>
                <option disabled="disabled">By rating</option>
                <option disabled="disabled">----</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 stars</option>
                <option value="0">0 stars</option>
              </select>
            </div>
            </div>

            <div className='col'>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text dropLabel" htmlFor="inputGroupSelect01">Sort by</label>
              </div>
              <select className="custom-select" id="inputGroupSelect01" defaultValue='0'>
                <option value="0">ID</option>
                <option value="1">Category</option>
                <option value="2">Rating</option>
                <option value="3">Author</option>
              </select>
            </div>
            </div>
            </div>
            <p>Showing {this.state.gmindersShowing.length}/{this.state.gminders.length} goodminders</p>
            <a href='#end'>Scroll to bottom</a>

            {/* MediaQuery for large screen */}
              <MediaQuery query="(min-width: 576px)">
          <table className="table table-striped alignL">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category</th>
                <th scope="col">Rating</th>
                <th scope="col">Goodminder</th>
                <th scope="col">Edit</th>

              </tr>
            </thead>
            <tbody>
          {
            this.state.gmindersShowing.map((gminder, i) => {
              return (
                  <tr key={this.generateKey(i)}>
                    <th scope="row">{gminder.id}</th>

                    <td>{gminder.category}</td>
                    <td>{gminder.rating}</td>
                    <td>
                      {gminder.promptID ? this.getPromptWithId(gminder.promptID).promptText : null}
                      {gminder.promptID ? <br /> : null}
                      {gminder.mainResponse}
                      {gminder.author ? <br /> : null}
                      {gminder.author ? this.displayAuthor(gminder): null}
                      {gminder.reason ? <br /> : null}
                      {gminder.reason ? gminder.reason : null}
                    </td>
                    <td>
                      <button className='clear-button' type='button' value={gminder.id} onClick={this.handleClick}><i className="fas fa-edit"></i></button>
                    </td>
                  </tr>
              )
            })
          }
        </tbody>
        </table>

      </MediaQuery>
        {/* MediaQuery for small screen */}
        <MediaQuery query="(max-width: 576px)">
          <table className="table table-striped alignL">
            <thead>
              <tr>
                <th scope="col">Stars
                    </th>
                <th scope="col">Goodminder</th>
                <th scope="col">Edit</th>

              </tr>
            </thead>
            <tbody>
          {
            this.state.gmindersShowing.map((gminder, i) => {
              return (
                  <tr key={this.generateKey(i)}>

                    <td>{gminder.rating}</td>
                    <td>
                      {gminder.promptID ? this.getPromptWithId(gminder.promptID).promptText : null}
                      {gminder.promptID ? <br /> : null}
                      {gminder.mainResponse}
                      {gminder.author ? <br /> : null}
                      {gminder.author ? this.displayAuthor(gminder): null}
                      {gminder.reason ? <br /> : null}
                      {gminder.reason ? gminder.reason : null}
                    </td>
                    <td>
                      <button className='clear-button' type='button' value={gminder.id} onClick={this.handleClick}><i className="fas fa-edit"></i></button>
                    </td>
                  </tr>
              )
            })
          }
        </tbody>
        </table>
        </MediaQuery>

        <CSVLink data={this.makeCSVArray()} ><button id='end' className='btn btn-small' type='button'>Download CSV of all data</button></CSVLink>
        <br />
        <a href='#beginning'>Scroll to top</a>
        <MediaQuery query="(max-width: 576px)">
          <hr />
        </MediaQuery>
      </div>
    </div>)
  }
}

export default GminderTable;
