import React, { useState, useEffect } from 'react';

const MovieRating = ({ voteAverage, movieId, onChangeRating }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Load the rating from local storage if available
    const savedRating = localStorage.getItem(`movieRating_${movieId}`);
    if (savedRating) {
      setRating(parseFloat(savedRating));
    } else {
      // If the rating is not available in local storage, use the initial vote_average
      setRating(voteAverage / 2);
    }
  }, [voteAverage, movieId]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    // Save the rating to local storage
    localStorage.setItem(`movieRating_${movieId}`, newRating);
    // Notify the parent component of the rating change
    onChangeRating(movieId, newRating);
  };

  // Generate stars based on the rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span
          key={i}
          className="star"
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer', color: "yellow" }}
        >
          &#9733;
        </span>
      ); // Filled star
    } else {
      stars.push(
        <span
          key={i}
          className="star"
          onClick={() => handleRatingChange(i)}
          style={{ cursor: 'pointer'}}
        >
          &#9733;
        </span>
      ); // Empty star
    }
  }

  return (
    <div>
      <div className="rating">Rating: {stars}</div>
    </div>
  );
};

export default MovieRating;