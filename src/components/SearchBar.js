import React, { Component } from 'react'
import Popup from './Popup';

import * as URL from './../utils/api_urls';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appList: [],
      searchQuery: "",
      loading: false,
      message: '',
      popupOk: false,
      popupData: []
    };
  }
  

  async componentDidMount() {
    try {
      const app_list_url = URL.TopAppsListURL;
      const list_response = await fetch(app_list_url);
      const appListData = await list_response.json();
      this.setState({ appList: appListData.data.map((i) => i.name) });
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: true, message: err.message });
    }
  }

  updateSearchQuery = (event) => {
    let val = event.target.value.toLowerCase().trim();
    if(val.length){
      this.setState({searchQuery: val, popupOk: true, popupData: this.state.appList.filter((i) => (i.toLowerCase().includes(val)))});
    }else{
      this.setState({searchQuery: val, popupOk: false});
    }
  }

  clearField = () => {
    this.setState({ isOpen: false });
    document.getElementById('inputlg').value = '';
  }

  render() {
    return (
      <div className="form-group search-bar center-block">
        <input
          className="form-control input-lg active-cyan-4"
          id="inputlg"
          type="text"
          placeholder="Search"
          value={this.state.searchQuery}
          onChange={this.updateSearchQuery}
        />
        <Popup isOpen={this.state.popupOk} items={this.state.popupData} />
      </div>
    )
  }
}

export default SearchBar;