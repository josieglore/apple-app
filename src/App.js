import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Favorites from './components/Favorites';

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      searchResults: {},
      searchTerm: '',
      favoritesClicked: false,
    };
    this.getFavorites = this.getFavorites.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  // componentDidMount() {
  //   this.getFavorites();
  // }

  getFavorites() {
    axios.get('/getFavorites')
      .then((response) => {
        const favesArr = [];
        response.data.favorites.forEach((favorite) => {
          favesArr.push(favorite);
        });
        this.setState({
          favorites: favesArr,
          favoritesClicked: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleBackClick() {
    this.setState({
      favoritesClicked: false,
    })
  }

  handleInputChange(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  handleSearchSubmit() {
    const { searchTerm } = this.state;
    const searchObj = {};
    let searchCopy = searchTerm;
    searchCopy = searchCopy.replace(/\s+/g, '+');
    axios.post(`https://itunes.apple.com/search?term=${searchCopy}`)
    .then((response) => {
      response.data.results.forEach((result) => {
        const resultObj = {id: result.trackId, name: result.trackName, artwork: result.artworkUrl30, genre: result.primaryGenreName, url: result.trackViewUrl };
        if (!searchObj[result.kind]) {
          searchObj[result.kind] = [resultObj];
        }
        else searchObj[result.kind].push(resultObj);
      })
    })
    .then(() => {
      this.setState({
        searchResults: searchObj,
      })
    })
  }

  addFavorite(result, key) {
    const { id, name, artwork, genre, url } = result;
    console.log(result)
    const { favorites } = this.state;
    const favesCopy = favorites.slice();
    axios.post('/addFavorite', {
      kind: key,
      id,
      name,
      artwork,
      genre,
      url,
    })
    .then(() => {
      const newFave = {
        kind: key,
        id,
        name,
        artwork,
        genre,
        url
      }
      favesCopy.push(newFave)
      this.setState({
        favorites: favesCopy,
      })
    });
  }

  render() {
    const { searchTerm, searchResults, favoritesClicked, favorites } = this.state;
    const resultsStyle = {
      display: 'flex',
      flexWrap: 'wrap',
    }
    const results = searchResults && !favoritesClicked ? 
    Object.keys(searchResults).map((key) => {
      return (
        <div>
          <h2>{key.toUpperCase()}S</h2>
          <div style={resultsStyle}>
            <SearchResults
              kindResults={searchResults[key]}
              addFavorite={this.addFavorite}
              kind={key}
            />
          </div>
        </div>
      )
    })
    : null;
    const searchBar = !favoritesClicked ? 
      <SearchBar
      searchTerm={searchTerm}
      handleInputChange={this.handleInputChange}
      handleSearchSubmit={this.handleSearchSubmit}
      getFavorites={this.getFavorites}
    />
    : null;
    const favoritesList = favoritesClicked ? 
      <Favorites
        favorites={favorites}
      />
    : null;
    const backButton = favoritesClicked ? 
      <button onClick={() => this.handleBackClick()}>Back to search</button>
    : null;
    return (
      <div>
      {searchBar}
      {results}
      {favoritesList}
      {backButton}
      </div>
    );
  }
}

export default App;
