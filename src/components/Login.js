import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div class="container col-3-of-4">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-6 mx-auto rmv-border">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h5 class="card-title text-center">Log In</h5>
                <form class="form-signin">
                  <div class="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Email address"
                      required
                      autofocus
                    />
                    <label for="inputEmail">Email address</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      placeholder="Password"
                      required
                    />
                    <label for="inputPassword">Password</label>
                  </div>
                  <button
                    class="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Log in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
