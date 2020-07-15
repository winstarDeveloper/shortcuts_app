import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as URL from './../utils/api_urls';
import { LoopCircleLoading } from 'react-loadingg';

class PopularApps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description_length: 300,
      loading: true,
      message: '',
      popularAppsData: [],
      pageNum: 1,
      limit: 10,
      max_page_num: 1000
    };
    this.getData = this.getData.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  async getData() {
    try {
      const url =
        URL.PopularAppsURL +
        '&page=' +
        this.state.pageNum +
        '&limit=' +
        this.state.limit;
      const response = await fetch(url);
      const appData = await response.json();
      if (appData.results < this.state.limit) {
        this.setState({ max_page_num: this.state.pageNum });
      }
      this.setState({ popularAppsData: appData.data });
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: true, message: err.message });
    }
  }

  async componentDidMount() {
    this.getData();
  }

  async handleNext() {
    if (this.state.pageNum < this.state.max_page_num) {
      await this.setState({ pageNum: this.state.pageNum + 1 });

      this.getData();
      this.forceUpdate();
    }
  }

  async handlePrevious() {
    if (this.state.pageNum > 1) {
      await this.setState({ pageNum: this.state.pageNum - 1 });

      this.getData();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="col-2-of-4 popular-apps">
        {this.state.loading ? (
          <div>
            <LoopCircleLoading />{' '}
            {this.state.message ? (
              <div className="alert alert-danger" role="alert">
                {this.state.message + ' : Check Connection and Reload the page'}
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            {this.state.popularAppsData.map((i) => (
              <Link className="link" key={i.name} to={'/app/' + i.name}>
                <div className="popular-apps-box animated fadeInUp">
                  <h4>{i.name}</h4>
                  <p>
                    {i.description.length > this.state.description_length
                      ? i.description.substring(
                          0,
                          this.state.description_length - 1
                        ) + ' .....more'
                      : i.description}
                  </p>
                </div>
              </Link>
            ))}

            <div className="main-nav-btns">
              {this.state.pageNum <= 1 ? null : (
                <div className="btn previous-btn" onClick={this.handlePrevious}>
                  &larr; Previous
                </div>
              )}
              <p className="page-num">{this.state.pageNum}</p>

              {this.state.pageNum >= this.state.max_page_num ? null : (
                <div className="btn next-btn" onClick={this.handleNext}>
                  Next &rarr;
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    );
  }
}

export default PopularApps;
