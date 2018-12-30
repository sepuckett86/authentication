// Note: modal cannot be inside responsive design display or it will not work for all screen sizes
import {connect} from "react-redux";
import * as actions from "../actions";
import {Link} from "react-router-dom";

import React from "react";

import MediaQuery from "react-responsive";

class PromptCollectionCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTitle: "",
      inputDescription: "",
      list1: [],
      list2: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getPrompts(() => {
      this.setState({
        list1: this.props.prompts
      });
    });
  }

  handleClick(event) {
    if (event.target.name === "confirmCreate") {
      const collection = this.createCollection();
      let promptString = '';
      this.state.list2.forEach(prompt => {promptString = promptString + String(prompt.id) + ', '})

      this.props.postPromptCollection(collection, () => {
        const promptCollectionID = this.props.promptCollectionID;
        console.log(promptCollectionID)
        this.props.postPromptPromptCollection(promptCollectionID, promptString, ()=> {
          this.props.getPromptCollections(() => {});
          this.props.changeManagerDisplay("promptCollections");
        })
      });
    }


    // From Add list to Book list
    if (event.currentTarget.name === "add") {
      const dataKey = Number(event.currentTarget.getAttribute("data-key"));
      // Define section
      const section = this.state.list1.filter(
        section => section.id === dataKey
      )[0];
      // Define new array of list1 minus section
      const newList1 = this.state.list1.filter(
        section => section.id !== dataKey
      );
      // Define new array of list2 plus section
      const newList2 = [...this.state.list2, section];
      // Set new state
      this.setState({
        list1: newList1,
        list2: newList2
      });
    }
    // From Book list to Add list
    if (event.currentTarget.name === "remove") {
      const dataKey = Number(event.currentTarget.getAttribute("data-key"));
      // Define section
      const section = this.state.list2.filter(
        section => section.id === dataKey
      )[0];
      // Define new array of list1 plus section
      const newList1 = [...this.state.list1, section];
      // Define new array of list2 minus section
      const newList2 = this.state.list2.filter(
        section => section.id !== dataKey
      );
      // Set new state
      this.setState({
        list1: newList1,
        list2: newList2
      });
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  renderSections(name) {
    if (name === "Prompts for New Collection") {
      return this.state.list2.map(section => {
        return (
          <button
            name="remove"
            key={section.id}
            data-key={section.id}
            onClick={this.handleClick}
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{section.promptText}</h5>
            </div>
          </button>
        );
      });
    }
    if (name === "Prompts to Add") {
      return this.state.list1.map(section => {
        return (
          <button
            type="button"
            name="add"
            key={section.id}
            data-key={section.id}
            onClick={this.handleClick}
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{section.promptText}</h5>
            </div>
          </button>
        );
      });
    }
  }

  createCollection() {
    return {
      collection: this.state.inputTitle,
      description: this.state.inputDescription,
      publicFlag: 0,
      prompts: this.state.list2
    };
  }

  generateKey(index) {
    return `${index}_${new Date().getTime()}`;
  }

  render() {
    return (
      <div className="container">
        {/* Modal - Must be outside of responsive design displays */}
        <div
          className="modal fade"
          id="createModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModal2"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create Prompt Collection
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Confirm change?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <Link to="/manager">
                  <button
                    type="button"
                    className="btn btn-primary"
                    name="confirmCreate"
                    data-dismiss="modal"
                    onClick={this.handleClick}
                  >
                    Confirm
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="box">
          <h1>Create New Prompt Collection</h1>
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={this.state.inputTitle}
                onChange={this.handleChange}
                className="form-control"
                name="inputTitle"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="inputDescription"
                value={this.state.inputDescription}
                onChange={this.handleChange}
                rows="3"
              />
            </div>
          </form>

          <div className="row">
          <div className="col-12 col-md-6">
            <div className="card bg-light mb-3">
              <div className="card-header">Prompts to Add</div>
              <div className="card-body card-body-menu">
                <div className="list-group">
                  {this.renderSections("Prompts to Add")}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card bg-light mb-3">
              <div className="card-header">Prompts for New Collection</div>
              <div className="card-body card-body-menu">
                <div className="list-group">
                  {this.renderSections("Prompts for New Collection")}
                </div>
              </div>
            </div>
          </div>
        </div>

          <br />


          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-green"
            data-toggle="modal"
            data-target="#createModal"
          >
            Create Prompt Collection
          </button>
        </div>

        {/* MediaQuery for small screen */}
        <MediaQuery query="(max-width: 576px)">
          <hr />
        </MediaQuery>

        <br />
        <div className="row">
          <div className="col">
          <Link to='manager'>
            <button
              id="random"
              name="Back"
              className="btn btn-custom"
              onClick={() => this.props.changeManagerDisplay("promptCollections")}
            >
            Back to Prompt Collections
            </button>
            </Link>
            <br />

            <br />
          </div>
          <br />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPrompt: state.navigation.currentPrompt,
    prompts: state.prompts,
    promptCollectionID: state.navigation.promptCollectionID
  };
}
export default connect(
  mapStateToProps,
  actions
)(PromptCollectionCreate);
