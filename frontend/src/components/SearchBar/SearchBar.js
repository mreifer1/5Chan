import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);  // Passes the query value back to home 
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search post by title or author...."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
