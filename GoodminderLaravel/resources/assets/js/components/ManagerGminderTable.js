import React from "react";

import MediaQuery from "react-responsive";
import {connect} from "react-redux";
import * as actions from "../actions";

//Add CSVDownload to import if want to use it
import {CSVLink} from "react-csv";

// This is the front-end of a database manager.
// How you interact and change the database.
class GminderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: [],
      gmindersShowing: [],
      sortBy: "id",
      filterBy: "all"
    };

    // bind methods
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.setGmindersShowing = this.setGmindersShowing.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentDidMount() {
    // Get data from database
    this.props.getGoodminders(() => {
      this.props.getPrompts(() => {
        this.setGmindersShowing(this.state.filterBy, this.state.showBy);
      });
    });
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

  makeCSVArray() {
    let myArray = [
      [
        "ID",
        "Category",
        "Collection",
        "Date",
        "Prompt",
        "Answer",
        "Reason",
        "Author",
        "Stars"
      ]
    ];
    this.props.gminders.forEach(gminder => {
      let innerArray = [
        gminder.id,
        gminder.category,
        gminder.collection,
        gminder.date,
        this.getPromptWithId(gminder.promptID),
        gminder.mainResponse,
        gminder.reason,
        gminder.author,
        gminder.rating
      ];
      myArray.push(innerArray);
    });
    return myArray;
  }

  getPromptWithId(id) {
    id = Number(id);
    for (let i = 0; i < this.props.prompts.length; i++) {
      if (this.props.prompts[i].id === id) {
        return this.props.prompts[i];
      }
    }
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
                  <option value="id">ID</option>
                  <option value="category">Category</option>
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
                  <th scope="col">ID</th>
                  <th scope="col">Category</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Goodminder</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.gmindersShowing.map((gminder, i) => {
                  return (
                    <tr key={this.generateKey(i)}>
                      <th scope="row">{gminder.id}</th>

                      <td>{gminder.category}</td>
                      <td>{gminder.rating}</td>
                      <td>
                        {gminder.promptID
                          ? this.getPromptWithId(gminder.promptID).promptText
                          : null}
                        {gminder.promptID ? <br /> : null}
                        {gminder.mainResponse}
                        {gminder.author ? <br /> : null}
                        {gminder.author ? this.displayAuthor(gminder) : null}
                        {gminder.reason ? <br /> : null}
                        {gminder.reason ? gminder.reason : null}
                      </td>
                      <td>
                        <button
                          className="btn-flat btn-blue"
                          type="button"
                          value={gminder.id}
                          onClick={this.handleClick}
                        >
                          <i className="fas fa-edit" />
                        </button>
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
                        {gminder.promptID
                          ? this.getPromptWithId(gminder.promptID).promptText
                          : null}
                        {gminder.promptID ? <br /> : null}
                        {gminder.mainResponse}
                        {gminder.author ? <br /> : null}
                        {gminder.author ? this.displayAuthor(gminder) : null}
                        {gminder.reason ? <br /> : null}
                        {gminder.reason ? gminder.reason : null}
                      </td>
                      <td>
                        <button
                          className="btn-flat btn-blue"
                          type="button"
                          value={gminder.id}
                          onClick={this.handleClick}
                        >
                          <i className="fas fa-edit" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </MediaQuery>

          <CSVLink data={this.makeCSVArray()}>
            <button id="end" className="btn btn-green" type="button">
              Download CSV of all data
            </button>
          </CSVLink>
          <br />
          <a href="#beginning">Scroll to top</a>
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
