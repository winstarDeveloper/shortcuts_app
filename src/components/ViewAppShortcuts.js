import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LoopCircleLoading } from 'react-loadingg';
import * as URL from './../utils/api_urls';

export default class ViewAppShortcuts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      appName: '',
      description: '',
      shortcuts: [],
      loading: true,
      message: '',
      temp_shortcuts: [],
      noResult: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  async componentDidMount() {
    try {
      const url = URL.AppURL + this.props.name;
      const response = await fetch(url);
      const appData = await response.json();
      // console.log(appData);
      if (appData.status === 'success') {
        this.setState({
          status: 'success',
          loading: false,
          appName: appData.data.name,
          description: appData.data.description,
          shortcuts: appData.data.shortcuts,
          temp_shortcuts: appData.data.shortcuts,
        });
      } else {
        this.setState({
          status: 'fail',
          loading: true,
          message: appData.message,
        });
      }
    } catch (err) {
      this.setState({ status: 'fail', loading: true, message: err.message });
    }
  }

  async handleSearch(event) {
    let val = event.target.value || '';
    let arr;
    if (val === '') {
      await this.setState({ temp_shortcuts: this.state.shortcuts, noResult: false });
    } else {
      val = val.toLowerCase().trim();
      if (Array.isArray(this.state.temp_shortcuts)) {
        arr = this.state.temp_shortcuts.filter((e) =>
          e.action.toLowerCase().includes(val)
        );
      }
      
      if (arr === undefined || !arr.length) {
        await this.setState({ noResult: true });
      } else {
        await this.setState({ temp_shortcuts: arr, noResult: false });
      }
    }
  }

  render() {
    return (
      <div className="col-3-of-4 viewappshortcuts">
        {this.state.loading ? (
          <div>
            {this.state.message === '' ? null : (
              <div className="alert alert-danger" role="alert">
                {this.state.message + ' : Check connection and Reload page'}
              </div>
            )}
            <LoopCircleLoading />
          </div>
        ) : (
          <div className="viewappshortcuts__main">
            <h1 className="viewappshortcuts__title">{this.state.appName}</h1>
            <p className="viewappshortcuts__description">
              {this.state.description}
            </p>

            <form className="viewappshortcuts__search">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Search</span>
                </div>
                <input
                  type="text"
                  className="form-control searchInput"
                  onChange={this.handleSearch}
                />
              </div>
            </form>

            <div className="viewappshortcuts__shortcuts">
              {this.state.noResult ? (
                <div key="0" className="viewappshortcuts__shortcut">
                  <h5>No match found</h5>
                </div>
              ) : (
                this.state.temp_shortcuts.map((i, index) => (
                  <div key={index} className="viewappshortcuts__shortcut animated fadeInUp">
                    <h5>{i.action}</h5>
                    <p>{i.shortcut.join('+')}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
