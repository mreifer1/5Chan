import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);  // Passes the query value back to the parent
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search post by title..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
