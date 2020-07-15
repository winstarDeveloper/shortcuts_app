import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  handleLogout = (event) => {
    alert('You have been Logged out!');
    sessionStorage.clear();
    this.forceUpdate();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <span className="app-name">Shortcuts App</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/applist">
                App List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/feedback">
                Feedback
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            { sessionStorage.getItem('token') ?  (
              <li className="nav-item btn-log" onClick={this.handleLogout}>
                <Link className="nav-link" to="/">
                  Logout
                </Link>
              </li>
            ) : null}
          </ul>

        </div>
      </nav>
    );
  }
}

export default Navbar;
