import React from 'react';
import './css/styles.css';
import './vendor/css/bootstrap.min.css';

import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
