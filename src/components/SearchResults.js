import React from 'react';

const SearchResults = (props) => {
  const { kindResults } = props;
  return (
    kindResults.map((result) => {
      return (
        <div>
          <h3>{result.name}</h3>
          <img src={result.artwork}/>
          <p>{result.id}</p>
          <p>{result.genre}</p>
          <p>{result.url}</p>
        </div>
      )
    })
  )
}

export default SearchResults;