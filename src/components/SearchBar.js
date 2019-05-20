import React from 'react';

const SearchBar = (props) => {
  const { handleInputChange, handleSearchSubmit, getFavorites } = props;
  return (
    <div>
      <h1>Search Apple</h1>
      <input type='text' onChange={handleInputChange}></input>
      <button onClick={handleSearchSubmit}>Search</button>
      <button onClick={getFavorites}>Click to View Favorites</button>
    </div>
  )
}

export default SearchBar;