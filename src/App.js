import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Watchlist from './components/Watchlist';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const fetchMovies = async (searchTerm) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: searchTerm,
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    fetchMovies(searchTerm);
  };

  const handleWatchlistChange = (updatedMovie) => {
    const updatedWatchlist = watchlist.map((movie) => {
      if (movie.id === updatedMovie.id) {
        return updatedMovie;
      }
      return movie;
    });
    setWatchlist(updatedWatchlist);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <Watchlist watchlist={watchlist} onWatchlistChange={handleWatchlistChange} />
    </div>
  );
};

export default App;

