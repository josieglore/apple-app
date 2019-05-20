import React from 'react';

const Favorites = (props) => {
  const { favorites } = props;
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
    // create box for each entry in the favorites array
    favorites.map((result, index) => {
      const kindStr = `${result.kind.charAt(0).toUpperCase()}${result.kind.slice(1)}`;
      return (
        <div id={`favorite-${index}`} style={resultBox}>
          <h3>{result.name}</h3>
          <img src={result.artwork}/>
          <p>{result.id}</p>
          <p>{kindStr}</p>
          <p>{result.genre}</p>
          <a href={result.url}>Find on iTunes</a>
        </div>
      )
    })
  )
}

export default Favorites;