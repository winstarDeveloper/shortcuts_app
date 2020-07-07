import React from 'react';


import './css/styles.css';
import './vendor/css/bootstrap.min.css';

import Header from './components/Header';
import Main from './components/Main';
import SearchBar from './components/SearchBar';


function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <Main />
    </div>
  );
}

export default App;
