import React from 'react';
import { FaStar } from 'react-icons/fa';

const MovieCard = ({ movie, onWatchlistChange }) => {
  const { title, release_year, rating, watched } = movie;

  const handleRatingChange = (newRating) => {
    const updatedMovie = { ...movie, rating: newRating };
    onWatchlistChange(updatedMovie);
  };

  const handleWatchedToggle = () => {
    const updatedMovie = { ...movie, watched: !watched };
    onWatchlistChange(updatedMovie);
  };

  return (
    <div className="movie-card">
      <h3>{title}</h3>
      <p>Release Year: {release_year}</p>
      <div className="rating">
        <span>Rating:</span>
        {[...Array(5)].map((_, index) => (
          <label key={index}>
            <input
              type="radio"
              value={index + 1}
              checked={rating === index + 1}
              onChange={() => handleRatingChange(index + 1)}
            />
            <FaStar className="star" color={index < rating ? '#ffc107' : '#e4e5e9'} />
          </label>
        ))}
      </div>
      <label>
        Watched:
        <input
          type="checkbox"
          checked={watched}
          onChange={handleWatchedToggle}
        />
      </label>
    </div>
  );
};

export default MovieCard;
