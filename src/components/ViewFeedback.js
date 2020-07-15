/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import Moment from 'react-moment';
import { LoopCircleLoading } from 'react-loadingg';
import * as URL from './../utils/api_urls';

class ViewFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      message: '',
      token: JSON.parse(sessionStorage.getItem('token')) || ''
    };
  }

  async componentDidMount() {
    try {
      const url = URL.FeedbackURL;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token
        }
      });
      // const response = await fetch(url);
      const feedbackData = await response.json();
      if (feedbackData.status === 'success') {
        this.setState({
          loading: false,
          data: feedbackData.data,
        });
      } else {
        this.setState({ loading: false, message: feedbackData.message });
      }
    } catch (err) {
      this.setState({ loading: true, message: err.message });
    }
  }

  render() {
    return (
      <div className="col-3-of-4 viewfeedback">
        <h2 className="viewfeedback__title">Received Feedbacks</h2>
        {this.state.token ? null : (
              <div className="alert alert-danger" role="alert">
                {this.state.message }
              </div>
            )}
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
          this.state.data.map((i, index) => {
            return (
            <div key={index} className="container">
              <div className="col-md-12">
                <h3 className='viewfeedback__name'>{i.name}</h3>
                <h5 className='viewfeedback__email'>{i.email}</h5>
            <p className="viewfeedback__dateAdded"><Moment>{i.dateAdded}</Moment></p>
                <p className='viewfeedback__feedback'>{i.feedback}</p>
              </div>
            </div>)
          })
        )}
      </div>
    );
  }
}

export default ViewFeedback;
