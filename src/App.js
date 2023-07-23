import React, { useState } from 'react';
import Watchlist from './components/Watchlist';
import MovieSearch from './components/MovieSearch';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const API_KEY = 'a75e655a62afe0300c1b7ad027ce2308';
const BASE_URL = 'https://api.themoviedb.org/3';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const fetchMovies = async (searchTerm) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: searchTerm,
        },
      });
      setSearchResults(response.data.results);
      console.log(response.data.results);
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

  return (
    <Routes>
      <Route path="/" element={<MovieSearch watchlist={searchResults} onSearch={handleSearch}/>} />
      {/* <Route path="/watchlist" element={<Watchlist watchlist={watchlist} onWatchlistChange={handleWatchlistChange} />} /> */}
      <Route path="/watchlist" element={<Watchlist />} />
      </Routes> 
  );
};

export default App;