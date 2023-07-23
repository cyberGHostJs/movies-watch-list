import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import MovieRating from "./MovieRating";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [filter, setFilter] = useState("All");

  // Load the watchlist from local storage when the component mounts
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  // Function to mark a movie as watched
  const handleWatchedToggle = (movieId) => {
    const updatedWatchlist = watchlist.map((movie) => {
      if (movie.id === movieId) {
        return { ...movie, watched: !movie.watched };
      }
      return movie;
    });

    setWatchlist(updatedWatchlist);

    // Save the updated watchlist to local storage
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  // Function to remove a movie from the watchlist
  const handleRemoveMovie = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);

    // Save the updated watchlist to local storage
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const handleRatingChange = (movieId, newRating) => {
    // Update the rating for the movie in your watchlist
    console.log(`Movie ${movieId} rating changed to: ${newRating}`);
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter the watchlist based on the selected filter
  const filteredWatchlist =
    filter === "Watched"
      ? watchlist.filter((movie) => movie.watched)
      : filter === "Unwatched"
      ? watchlist.filter((movie) => !movie.watched)
      : watchlist;

  const handleViewLocalStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(`${key}: ${value}`);
    }
  };

  const handleClearLocalStorage = () => {
    localStorage.clear();
    // Optionally, you can also trigger a reload of the page to reset the application state
    window.location.reload();
  };

  return (
    <div>
      <Navigation />
      <h2>My Watchlist</h2>
      <button onClick={handleClearLocalStorage}>Clear Local Storage</button>
      <button onClick={handleViewLocalStorage}>View Local Storage Data</button>
      <div>
        <label>
          Filter:
          <select value={filter} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Watched">Watched</option>
            <option value="Unwatched">Unwatched</option>
          </select>
        </label>
      </div>
      {filteredWatchlist.length === 0 ? (
        <p>Your {filter.toLowerCase()} movie list is empty.</p>
      ) : (
        <ul>
          {filteredWatchlist.map((movie) => (
            <li key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
              <label>
                <input
                  type="radio"
                  name={`watched_${movie.id}`}
                  checked={movie.watched || false}
                  onChange={() => handleWatchedToggle(movie.id)}
                />
                <span
                  style={{
                    textDecoration: movie.watched ? "line-through" : "none",
                    marginRight: "10px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "larger"
                  }}
                >
                  {movie.title}
                </span>
              </label>
              <p>Release date: {movie.release_date}</p>
              <MovieRating
                voteAverage={movie.vote_average}
                movieId={movie.id}
                onChangeRating={handleRatingChange}
              />
              <button onClick={() => handleRemoveMovie(movie.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;
