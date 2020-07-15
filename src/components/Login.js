import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as URL from './../utils/api_urls';

const validator = require('email-validator');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'success',
      message: '',
      reqSuccess: false,
      email: '',
      password: '',
      token: JSON.parse(sessionStorage.getItem('token')) || ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.email !== '' && !validator.validate(this.state.email)) {
      await this.setState({
        status: 'fail',
        message: 'Please enter a Valid Email',
      });
    } else if (this.state.password === '') {
      await this.setState({
        status: 'fail',
        message: 'Please Enter a Password',
      });
    } else {
      await this.setState({
        status: 'success',
      });
    }

    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    // console.log(data);

    if (this.state.status !== 'fail') {
      try {
        const response = await fetch(
          URL.LoginURL,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );
        const res = await response.json();
        this.setState({ status: res.status, token: res.token });
        sessionStorage.setItem('token', JSON.stringify(res.token));
        this.forceUpdate();

        if (res.status === 'success') {
          if(!this.state.token){
            document.getElementById('inputEmail').value = '';
            document.getElementById('inputPassword').value = '';
          }

          this.setState({
            message: '',
            reqSuccess: true,
            email: '',
            password: '',
          });
        } else {
          this.setState({ status: res.status, message: res.message });
        }
      } catch (err) {
        this.setState({
          status: 'error',
          message: err.message + ' : Check connection and Reload the Page',
        });
      }
    }
    window.location.reload();
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="col-3-of-4 login">
        {this.state.status !== 'success' ? (
          <div className="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        ) : null}
        {this.state.reqSuccess || this.state.token  ? (
          <div className="login__success">
            <div className="alert alert-success" role="alert">
              You are Logged in !
            </div>
            <Link to={{ pathname: "/adddata", state: {/* token: this.state.token */} }}>
              <button className="btn btn-lg btn-outline-success text-uppercase add-app">
                Add App Shortcuts
              </button>
            </Link>
        <Link to={{ pathname: "/viewfeedback", state: {/* token: this.state.token */}}}>
              <button className="btn btn-lg btn-outline-success text-uppercase view-feedbacks">
                View Feedbacks
              </button>
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-6 mx-auto rmv-border">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Log In</h5>
                  <form className="form-signin" onSubmit={this.handleSubmit}>
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        onChange={this.handleEmailChange}
                        required
                        autoFocus
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        onChange={this.handlePasswordChange}
                        required
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                    >
                      Log in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
