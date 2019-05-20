import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      searchResults: {},
      searchTerm: '',
    };
    this.getFavorites = this.getFavorites.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

 // retrieve movie factoids from database and populate movies array in state
  getFavorites() {
    axios.get('http://localhost:3000/')
      .then((response) => {
        const favesArr = [];
        response.data.favorites.forEach((favorite) => {
          favesArr.push(favorite);
        });
        this.setState({
          favorites: favesArr,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
  render() {
    const { searchTerm, searchResults } = this.state;
    const results = searchResults ? 
    Object.keys(searchResults).map((key) => {
      return (
        <div>
          <h2>{key.toUpperCase()}S</h2>
          <SearchResults
            kindResults={searchResults[key]}
          />
        </div>
      )
    })
    : null;
    return (
      <div>
        <h1>Search Apple</h1>
        <SearchBar
          searchTerm={searchTerm}
          handleInputChange={this.handleInputChange}
          handleSearchSubmit={this.handleSearchSubmit}
        />
      {results}
      </div>
    );
  }
}

export default App;
