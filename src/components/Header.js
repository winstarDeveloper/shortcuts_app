import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header>
      <Navbar />
      <SearchBar />
    </header>
  );
}

export default Header;