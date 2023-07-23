import React from "react";

const MovieCard = ({ movie, onAddToWatchlist }) => {
  const { title, release_date, vote_average , poster_path, id, overview } = movie;

  const handleMovieClick = () => {
    // Add the movie data to the watchlist in local storage
    const movieData = {
      title,
      release_date,
      vote_average,
      poster_path,
      id,
    };
    console.log("added")
    onAddToWatchlist(movieData);
  };

  return (
    <div className="movie-card" onClick={handleMovieClick}>
      <img
        src={`https://image.tmdb.org/t/p/w200${poster_path}`}
        alt={`${title} Poster`}
      />
      <h3>{title}</h3>
      <p>Overview: {overview}</p>
      <p>Release Date: {release_date}</p>
    </div>
  );
};

export default MovieCard;