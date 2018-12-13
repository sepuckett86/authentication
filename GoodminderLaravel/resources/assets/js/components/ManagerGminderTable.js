import React from "react";

import MediaQuery from "react-responsive";
import {connect} from "react-redux";
import * as actions from "../actions";
import { Link } from 'react-router-dom';

// CSV capabilities
import {CSVLink} from "react-csv";
import CSVReader from "react-csv-reader";

import { replaceQuotes } from './functions';

// This is the front-end of a database manager.
// How you interact and change the database.
class GminderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gmindersShowing: [],
      sortBy: "id",
      filterBy: "all",
      gmindersFromCSV: [],
    };

    // bind methods
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.setGmindersShowing = this.setGmindersShowing.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.handleForce = this.handleForce.bind(this);
    this.handleClickUpload = this.handleClickUpload.bind(this);
  }

  componentDidMount() {
    // Get data from database
    this.props.getGoodminders(() => {

      this.setGmindersShowing(this.state.filterBy, this.state.showBy);

    });
  }

  handleForce(data) {
    this.props.getPrompts(()=> {
      const arrayOfArrays = data;
      let arrayOfNewGminders = [];
      let newGminder = {};
      for (let arr of arrayOfArrays) {
        newGminder["category"] = arr[0];
        newGminder["collection"] = arr[1];
        newGminder["promptText"] = arr[2];
        newGminder["mainResponse"] = arr[3];
        newGminder["author"] = arr[4];
        newGminder["reason"] = arr[5];
        newGminder["source"] = arr[6];
        newGminder["who"] = arr[7];
        newGminder["rating"] = Number(arr[8]);
        if (arr[0] === 'prompt') {
            let filtered = this.props.prompts.filter(prompt => prompt.promptText === arr[2]);
            // If prompt exists to user
            if (filtered.length >= 1) {
              newGminder["prompt_id"] = filtered[0].id;
              console.log(filtered[0].id);
              arrayOfNewGminders.push({ ...newGminder });
            } else {
              newGminder["prompt_id"] = null;
              console.log('Add prompt to database first')
            }
        } else {
          newGminder["prompt_id"] = null;
          arrayOfNewGminders.push({ ...newGminder });
        }

      }
      // Remove first row of column names
      arrayOfNewGminders.shift();
      this.setState({ gmindersFromCSV: arrayOfNewGminders })
    })

  }

  handleClickUpload() {
    console.log(this.state.gmindersFromCSV)
    let arrayOfGminderMainResponses = [];
    this.props.gminders.forEach(gminder => {
      arrayOfGminderMainResponses.push(gminder.mainResponse)
    })
    // mainResponses must be unique
    this.state.gmindersFromCSV.forEach(goodminder => {
      let dequotedGminder = goodminder;
      if (!arrayOfGminderMainResponses.includes(goodminder.mainResponse)) {
        dequotedGminder.mainResponse = replaceQuotes(goodminder.mainResponse)
        this.props.postGoodminder(dequotedGminder, ()=> {})
      }
    })
  }

  setGmindersShowing(filterBy, sortBy) {
    if (filterBy === "all") {
      let filtered = this.props.gminders;
      filtered = this.sortBy(sortBy, filtered);
      this.setState({gmindersShowing: filtered});
    }
    if (filterBy === "quote") {
      let filtered = this.props.gminders.filter(gminder => {
        return gminder.category === "quote";
      });
      filtered = this.sortBy(sortBy, filtered);
      this.setState({gmindersShowing: filtered});
    }
    if (filterBy === "prompt") {
      let filtered = this.props.gminders.filter(gminder => {
        return gminder.category === "prompt";
      });
      filtered = this.sortBy(sortBy, filtered);
      this.setState({gmindersShowing: filtered});
    }
    if (filterBy === "custom") {
      let filtered = this.props.gminders.filter(gminder => {
        return gminder.category === "custom";
      });
      filtered = this.sortBy(sortBy, filtered);
      this.setState({gmindersShowing: filtered});
    }
    if (filterBy === "5") {
      let filtered = this.props.gminders.filter(gminder => {
        return gminder.rating === 5;
      });
      filtered = this.sortBy(sortBy, filtered);
      this.setState({gmindersShowing: filtered});
    }
    if (filterBy === "4") {
      let filtered = this.props.gminders.filter(gminder => {
        return gminder.rating === 4;
      });
      filtered = this.sortBy(sortBy, filtered);
      this.setState({gmindersShowing: filtered});
    }
    if (filterBy === "3") {
      let filtered = this.props.gminders.filter(gminder => {
        return gminder.rating === 3;
      });
      filtered = this.sortBy(sortBy, filtered);
      this.setState({gmindersShowing: filtered});
    }
    if (filterBy === "2") {
      let filtered = this.props.gminders.filter(gminder => {
        return gminder.rating === 2;
      });
      filtered = this.sortBy(sortBy, filtered);
      this.setState({gmindersShowing: filtered});
    }
    if (filterBy === "1") {
      let filtered = this.props.gminders.filter(gminder => {
        return gminder.rating === 1;
      });
      filtered = this.sortBy(sortBy, filtered);
      this.setState({gmindersShowing: filtered});
    }
    if (filterBy === "0") {
      let filtered = this.props.gminders.filter(gminder => {
        return gminder.rating === 0;
      });
      filtered = this.sortBy(sortBy, filtered);
      this.setState({gmindersShowing: filtered});
    }
  }

  sortBy(value, gminders) {
    let sorted = gminders;
    if (value === "id") {
      sorted.sort(function(a, b) {
        const intA = a.id;
        const intB = b.id;
        return intA < intB ? -1 : intA > intB ? 1 : 0;
      });
    }
    if (value === "category") {
      sorted.sort(function(a, b) {
        const textA = a.category.toUpperCase();
        const textB = b.category.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }
    if (value === "collection") {
      sorted.sort(function(a, b) {
        const textA = a.collection.toUpperCase();
        const textB = b.collection.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }
    if (value === "rating") {
      sorted.sort(function(a, b) {
        const intA = a.rating;
        const intB = b.rating;
        return intA > intB ? -1 : intA < intB ? 1 : 0;
      });
    }
    if (value === "author") {
      sorted.sort(function(a, b) {
        if (a.author && b.author) {
          const textA = a.author.toUpperCase();
          const textB = b.author.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        } else if (a.author && !b.author) {
          // Account for some gminders lacking authors
          const textA = a.author.toUpperCase();
          const textB = "";
          return textA > textB ? -1 : textA < textB ? 1 : 0;
        } else if (!a.author && b.author) {
          const textA = "";
          const textB = b.author.toUpperCase();
          return textA > textB ? -1 : textA < textB ? 1 : 0;
        } else {
          const textA = "";
          const textB = "";
          return textA > textB ? -1 : textA < textB ? 1 : 0;
        }
      });
    }
    return sorted;
  }

  handleClick(event) {
    const myID = event.currentTarget.getAttribute("value");
    for (let i = 0; i < this.props.gminders.length; i++) {
      if (Number(myID) === Number(this.props.gminders[i].id)) {
        this.props.setCurrentGM(this.props.gminders[i]);
        this.props.changeHomeDisplay("edit");
      }
    }
  }

  handleSelect(event) {
    if (event.target.id === "filter") {
      const filterBy = event.target.value;
      const sortBy = this.state.sortBy;
      this.setGmindersShowing(filterBy, sortBy);
      this.setState({
        filterBy: event.target.value
      });
    }
    if (event.target.id === "sort") {
      const filterBy = this.state.filterBy;
      const sortBy = event.target.value;
      this.setGmindersShowing(filterBy, sortBy);
      this.setState({
        sortBy: event.target.value
      });
    }
  }

  generateKey(index) {
    return `${index}_${new Date().getTime()}`;
  }
  makeEmptyCSVArray() {
    let myEmptyArray = [
      [
        "category",
        "collection",
        "promptText",
        "mainResponse",
        "author",
        "reason",
        "source",
        "who",
        "rating",

      ]
    ];
    let innerArray = [
      'prompt',
      'Questions',
      'What is your favorite comfort food?',
      'Grilled cheese sandwiches',
      null,
      'My mom used to make them for me.',
      null,
      null,
      5,

    ];
    myEmptyArray.push(innerArray);
    innerArray = [
      'quote',
      'Funny Sayings',
      null,
      'May your beer be laid under an enchantment of surpassing excellence for seven years!',
      'J.R.R. Tolkien',
      'We laughed out loud at this quote.',
      'The Fellowship of the Ring',
      'Gandalf',
      5,

    ];
    myEmptyArray.push(innerArray);
    innerArray = [
      'custom',
      'Affirmations',
      null,
      'Breathe.',
      null,
      null,
      null,
      null,
      4,

    ];
    myEmptyArray.push(innerArray);
    return myEmptyArray;
  }

  makeCSVArray() {
    let myArray = [
      [
        "category",
        "collection",
        "promptText",
        "mainResponse",
        "author",
        "reason",
        "source",
        "who",
        "rating"
      ]
    ];
    this.props.gminders.forEach(gminder => {
      let innerArray = [
        gminder.category,
        gminder.collection,
        gminder.promptText,
        gminder.mainResponse,
        gminder.author,
        gminder.reason,
        gminder.source,
        gminder.who,
        gminder.rating
      ];
      myArray.push(innerArray);
    });
    return myArray;
  }

  shortenGminder(gminder) {
    if (gminder.length > 100) {
      let short = gminder.slice(0, 100);
      short = short.concat("...");
      gminder = short;
    }
    return gminder;
  }

  displayAuthor(quote) {
    if (quote.who && quote.source && quote.author) {
      return `-- ${quote.who}, from ${quote.source} by ${quote.author}`;
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
  renderListGroup() {
    return (
      <div className="list-group alignL">
        <a
          href="#"
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Prompt | Funny </h5>
            <small className="text-muted">5 stars</small>
          </div>
          <p className="mb-1">
            What is your favorite food?
            <br />
            Burritos. Because delicious.
          </p>
          <small className="text-muted">2018-11-15</small>
        </a>
      </div>
    );
  }
  render() {
    return (
      <div id="beginning" className="box">
        <div>
          <h1>Manage Goodminders</h1>
          <hr />
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
                  <option value="id">Date Added</option>
                  <option value="category">Category</option>
                  <option value="collection">Collection</option>
                  <option value="rating">Rating</option>
                  <option value="author">Author</option>
                </select>
              </div>
            </div>
          </div>
          <p>
            Showing {this.state.gmindersShowing.length}/{
              this.props.gminders.length
            }{" "}
            goodminders
          </p>
          <a href="#end">Scroll to bottom</a>

          {/* MediaQuery for large screen */}
          <MediaQuery query="(min-width: 576px)">
            <table className="table table-striped alignL">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Category</th>
                  <th scope="col">Collection</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Goodminder</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.gmindersShowing.map((gminder, i) => {
                  return (
                    <tr key={this.generateKey(i)}>
                      <th scope="row">{i+1}</th>

                      <td>{gminder.category}</td>
                      <td>{gminder.collection}</td>
                      <td>{gminder.rating}</td>
                      <td>
                        {gminder.promptText
                          ? gminder.promptText : null}
                        {gminder.promptText
                            ? <br /> : null}
                        {gminder.mainResponse}
                        {gminder.author ? <br /> : null}
                        {gminder.author ? this.displayAuthor(gminder) : null}
                        {gminder.reason ? <br /> : null}
                        {gminder.reason ? gminder.reason : null}
                      </td>
                      <td>
                      <Link to="/">
                        <button
                          className="btn-flat btn-blue"
                          type="button"
                          value={gminder.id}
                          onClick={this.handleClick}
                        >
                          <i className="fas fa-edit" />
                        </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          </MediaQuery>

          {/* MediaQuery for small screen */}
          <MediaQuery query="(max-width: 575px)">
            <table className="table table-striped alignL">
              <thead>
                <tr>
                  <th scope="col">Rating</th>
                  <th scope="col">Goodminder</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.gmindersShowing.map((gminder, i) => {
                  return (
                    <tr key={this.generateKey(i)}>
                      <td>{gminder.rating}</td>
                      <td>
                        {gminder.promptText
                          ? gminder.promptText
                          : null}
                          {gminder.promptText
                              ? <br /> : null}
                        {gminder.mainResponse}
                        {gminder.author ? <br /> : null}
                        {gminder.author ? this.displayAuthor(gminder) : null}
                        {gminder.reason ? <br /> : null}
                        {gminder.reason ? gminder.reason : null}
                      </td>
                      <td>
                      <Link to="/">
                        <button
                          className="btn-flat btn-blue"
                          type="button"
                          value={gminder.id}
                          onClick={this.handleClick}
                        >
                          <i className="fas fa-edit" />
                        </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </MediaQuery>

          <CSVLink data={this.makeCSVArray()}>
            <button className="btn btn-green" type="button">
              Download CSV of all data
            </button>
          </CSVLink>
          {' '}
          <CSVLink data={this.makeEmptyCSVArray()}>
            <button className="btn btn-green" type="button">
              Download CSV Template
            </button>
          </CSVLink>

          <br />
            <button className="btn btn-green" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Upload CSV
            </button>
            <br />
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
            <CSVReader
              cssclassName="react-csv-input"
              label="Select CSV file with goodminders to upload. It must have the .csv extension and be a modified version of the downloadable CSV template, with the same column order. Goodminder will only be added if the mainResponse is unique. Prompt responses will only be added if the prompt is in your collection."
              onFileLoaded={this.handleForce}
            />
            <button onClick={this.handleClickUpload}>Add Goodminders from Uploaded CSV to Database</button>
            </div>
          </div>
          <a id='end' href="#beginning">Scroll to top</a>
          <MediaQuery query="(max-width: 576px)">
            <hr />
          </MediaQuery>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gminders: state.goodminders,
    prompts: state.prompts
  };
}

export default connect(
  mapStateToProps,
  actions
)(GminderTable);
