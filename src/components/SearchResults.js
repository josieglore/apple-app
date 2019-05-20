import React from 'react';

const SearchResults = (props) => {
  const { kindResults } = props;
  return (
    kindResults.map((result) => {
      return (
        <div>
          <h3>Name</h3>
          <p>{result.name}</p>
        </div>
      )
    })
  )
}

export default SearchResults;