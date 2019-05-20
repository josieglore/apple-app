import React from 'react';

const SearchResults = (props) => {
  const { kindResults, addFavorite, kind } = props;
  return (
    kindResults.map((result, index) => {
      return (
        <div id={`${kind}-${index}`}>
          <h3>{result.name}</h3>
          <img src={result.artwork}/>
          <p>{result.id}</p>
          <p>{result.genre}</p>
          <p>{result.url}</p>
          <button onClick={() => addFavorite(result)}>Add to Favorites</button>
        </div>
      )
    })
  )
}

export default SearchResults;