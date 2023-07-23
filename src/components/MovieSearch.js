import React, { useState } from "react";
import MovieCard from "./MovieCard";
import Navigation from "./Navigation";

const MovieSearch = ({ watchlist, onWatchlistChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const addToWatchlist = (movieData) => {
    // Retrieve the existing watchlist from local storage (if any)
    const existingWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Check if the movie is already in the watchlist
    const isMovieInWatchlist = existingWatchlist.some((movie) => movie.id === movieData.id);

    if (!isMovieInWatchlist) {
      // Add the new movie data to the watchlist
      existingWatchlist.push(movieData);
      // Update the watchlist in local storage
      localStorage.setItem("watchlist", JSON.stringify(existingWatchlist));
      // You can also update your state or perform other actions as needed
      // onWatchlistChange(existingWatchlist);
    }
  };

  return (
    <div>
      <Navigation />
      <div>
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <h2>Search Results</h2>
      <p>Click movie title from search results to add to your watch list</p>
      {watchlist.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onWatchlistChange={onWatchlistChange}
          onAddToWatchlist={addToWatchlist} // Pass the onAddToWatchlist function to MovieCard
        />
      ))}
    </div>
  );
};

export default MovieSearch;