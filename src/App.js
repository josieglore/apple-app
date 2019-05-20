import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Favorites from './components/Favorites';


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

  // retrieve list of saved favorites from database
  // create new array of favorites, push all reusults from database into array
  // update favorites array in state with favesArr
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

  // go back to search page
  // note: would normally do react router, 
  // but did conditional rendering for sake of time
  handleBackClick() {
    this.setState({
      favoritesClicked: false,
    })
  }

  // track change in search box value on typing event
  handleInputChange(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  // create empty search object --> each key on search object will be a different kind of media, with value being an array of results for that kind
  // query iTunes API with search term from input field
  // create a results object for each search result
  // if the media kind for the result already exists in search object, push result onto array associated with that key
  // update searchResults property in state with searchObj
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

  // result parameter is whatever result gets returned from API call (for each result)
  // key parameter is the media kind key from searchResults
  // insert all result values and the key value into favorites database
  // create new object out of result + key values and push onto copy of favorites array from state (this will ensure state gets updated if there is a lag in updating the database)
  // NOTE: would normally use something like Cloudinary for picture uploads, but did not here for the sake of time
  addFavorite(result, key) {
    const { id, name, artwork, genre, url } = result;
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
    alert('Added to favorites');
  }

  render() {
    const { searchTerm, searchResults, favoritesClicked, favorites } = this.state;
    const resultsStyle = {
      display: 'flex',
      flexWrap: 'wrap',
    }
    // create a header for each key (media kind) in searchResults object
    const results = searchResults && !favoritesClicked ? 
    Object.keys(searchResults).map((key) => {
      return (
        <div>
          <h2>{key.toUpperCase().replace(new RegExp('-','g'),' ')}S</h2>
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
      {backButton}
      <br />
      <br />
      {favoritesList}
      </div>
    );
  }
}

export default App;
