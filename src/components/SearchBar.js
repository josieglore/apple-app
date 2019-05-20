import React from 'react';

const SearchBar = (props) => {
  const { handleInputChange, handleSearchSubmit } = props;
  return (
    <div>
      <input type='text' onChange={handleInputChange}></input>
      <button onClick={handleSearchSubmit}>Search</button>
    </div>
  )
}

export default SearchBar;