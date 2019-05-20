import React from 'react';

const SearchBar = (props) => {
  const { handleInputChange, handleSearchSubmit } = props;
  return (
    <div>
      <h1>Search Apple</h1>
      <input type='text' onChange={handleInputChange}></input>
      <button onClick={handleSearchSubmit}>Search</button>
    </div>
  )
}

export default SearchBar;