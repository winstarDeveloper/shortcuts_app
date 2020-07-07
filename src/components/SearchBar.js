import React, { Component } from 'react'

class SearchBar extends Component {
  state = {
    searchQuery: ""
  };
  updateSearchQuery = (query) => {
    this.setState(() => ({
      searchQuery: query.trim()
    }))
  }
  render() {
    return (
      <div class="form-group search-bar center-block">
        <input
          class="form-control input-lg active-cyan-4"
          id="inputlg"
          type="text"
          placeholder="Search"
          value={this.state.searchQuery}
          onChange={(event) => this.updateSearchQuery(event.target.value)}
        />
      </div>
    )
  }
}

export default SearchBar;