import React, { Component } from "react";
import axios from "axios";

import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      channels: [],
      suggestions: [],
      text: ""
    };
  }

  componentDidMount() {
    axios.get("/api/users").then(getAllUsers => {
      // console.log("DATA", getAllUsers.data);
      this.setState({ friends: getAllUsers.data });
    });
  }

  searchFriends = e => {
    const value = e.target.value;
    // console.log("RENDER SUGGESTIONS", value);
    let suggestions = [];
    if (value.length > 0) {
      // console.log("hello");
      const regex = new RegExp(`^${value}`, "i");
      // console.log("REGEX", regex);
      suggestions = this.state.friends
        .sort()
        .filter(friend => regex.test(friend.username));
      // console.log("SUGGESTIONS SEARCH", suggestions);
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div>
        {suggestions.map(friend => (
          <div
            key={friend.username}
            onClick={() => this.suggestionSelected(friend.username)}
          >
            <div>
              <img src={friend.imageurl} />
              {friend.username}
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    // console.log("ALL USERS STATE", this.state);
    // console.log("FRIENDS", this.state.friends);
    // console.log("SUGGESTIONS", this.state.suggestions);
    const { text } = this.state;

    return (
      <div className="search-container">
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <form className="form-inline my-2 my-lg-0 mr-4">
            <div className="input-group">
              <input
                onChange={this.searchFriends}
                value={text}
                className="form-control form-control-sm"
                type="text"
                placeholder="Search Friends"
              />
              <div className="invisible dropdown-menu input-group-append">
                <div className="visible">{this.renderSuggestions()}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
