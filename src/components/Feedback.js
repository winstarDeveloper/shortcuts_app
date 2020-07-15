import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as URL from './../utils/api_urls';

const validator = require('email-validator');

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      feedback: '',
      message: '',
      status: 'success',
      reqSuccess: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.name === '') {
      await this.setState({
        status: 'fail',
        message: 'Name is required',
      });
    } else if (this.state.email !== '' && !validator.validate(this.state.email)) {
        await this.setState({
          status: 'fail',
          message: 'Please enter a Valid Email',
        });
    } else if (
      this.state.feedback.length < 10
    ) {
      await this.setState({
        status: 'fail',
        message: 'Feedback should be between 10 and 500 characters long',
      });
    } else {
      await this.setState({
        status: 'success',
        message: ''
      });
    }

    const data = {
      name: this.state.name,
      email: this.state.email,
      feedback: this.state.feedback
    };

    if (this.state.status !== 'fail') {
      const response = await fetch(URL.FeedbackURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      await this.setState({ status: res.status, message: res.message });
      // console.log(res.message);

      if (res.status === 'success') {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('feedback').value = '';

        this.setState({
          message: '',
          reqSuccess: true,
          name: '',
          email: '',
          feedback: '',
          status: 'success',
        });
      }
    }
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleFeedbackChange = (event) => {
    this.setState({ feedback: event.target.value });
  };

  handleClear = (event) => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('feedback').value = '';
  };

  render() {
    return (
      <div className="col-3-of-4">
        {this.state.reqSuccess ? (
          <div className="alert alert-success" role="alert">
            Thanks for your Feedback !
          </div>
        ) : (
          <div>
            <h1 className="feedback__title">Give Feedback </h1>
            {this.state.status !== 'success' ? (
              <div className="alert alert-danger" role="alert">
                {this.state.message}
              </div>
            ) : null}
            <div className="feedback__form">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Control
                    id="name"
                    type="text"
                    placeholder="Enter Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Your Feedback here: </Form.Label>
                  <Form.Control
                    id="feedback"
                    as="textarea"
                    rows="5"
                    value={this.state.feedback}
                    onChange={this.handleFeedbackChange}
                  />
                </Form.Group>
                <Button variant="outline-secondary" onClick={this.handleClear}>
                  Clear
                </Button>
                {'\t'}
                <Button
                  className="feedback__btn"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Feedback;
