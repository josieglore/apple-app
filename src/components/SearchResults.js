import React from 'react';

const SearchResults = (props) => {
  const { kindResults, addFavorite, kind } = props;
  const resultBox = {
    padding: '15px',
    width: '30%',
    margin: '5px 5px 13px 10px',
    float:'left',
    fontSize: '.8em',
    boxShadow: '5px 5px 15px rgba(0, 0, 0, .2)',
    backgroundColor: '#e0e6e8',
  }
  return (
    kindResults.map((result, index) => {
      return (
        <div id={`${kind}-${index}`} style={resultBox}>
          <h3>{result.name}</h3>
          <img src={result.artwork}/>
          <p>{result.id}</p>
          <p>{result.genre}</p>
          <a href={result.url}>Find on iTunes</a>
          <br />
          <br />
          <button onClick={() => addFavorite(result, kind)}>Add to Favorites</button>
        </div>
      )
    })
  )
}

export default SearchResults;