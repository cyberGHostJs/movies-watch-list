import React, { useState, lazy, Suspense } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/movieCard.css";
import "./styles/movieSearch.css";
import "./styles/navigation.css";
import "./styles/watchList.css";
import PageNotFound from "./components/PageNotFound";
import LoadingSpinner from "./components/LoadingSpinner"; // Import the LoadingSpinner component

const API_KEY = "a75e655a62afe0300c1b7ad027ce2308";
const BASE_URL = "https://api.themoviedb.org/3";

// Lazy load the MovieSearch and Watchlist components
const MovieSearch = lazy(() => import("./components/MovieSearch"));
const Watchlist = lazy(() => import("./components/Watchlist"));

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [fetchErr, setFetchErr] = useState(false);

  const fetchMovies = async (searchTerm) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: searchTerm,
        },
      });
      setSearchResults(response.data.results);
      setFetchErr(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setFetchErr(true);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    fetchMovies(searchTerm);
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          path="/"
          element={
            <MovieSearch
              watchlist={searchResults}
              onSearch={handleSearch}
              fetchErr={fetchErr}
            />
          }
        />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
