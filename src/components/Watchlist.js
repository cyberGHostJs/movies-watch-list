import React from 'react';
import MovieCard from './MovieCard';

const Watchlist = ({ watchlist, onWatchlistChange }) => {
  return (
    <div>
      <h2>My Watchlist</h2>
      {watchlist.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onWatchlistChange={onWatchlistChange}
        />
      ))}
    </div>
  );
};

export default Watchlist;
