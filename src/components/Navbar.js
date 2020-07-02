import React from 'react';

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="http://localhost:3000/"
          ><span class="app-name">Shortcuts App</span></a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="http://localhost:3000/"
                >Home <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="http://localhost:3000/">App List</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="http://localhost:3000/">Feedback</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="http://localhost:3000/">About</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  
  export default Navbar;