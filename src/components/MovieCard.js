import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import ribbon_svg from "../images/ribbon.svg";

const MovieCard = ({ movie, onAddToWatchlist }) => {
  const { title, release_date, vote_average, poster_path, id, overview } =
    movie;

  const [add, setAdd] = useState(false);

  const handleMovieClick = () => {
    setAdd(true);
    // Add the movie data to the watchlist in local storage
    const movieData = {
      title,
      release_date,
      vote_average,
      poster_path,
      id,
    };
    onAddToWatchlist(movieData);
  };

  useEffect(() => {
    if (add) {
      // After 5 seconds, hide the success message
      const timer = setTimeout(() => {
        setAdd(false);
      }, 1000);

      // Clean up the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [handleMovieClick]);

  return (
    <Col lg={3} md={4} sm={6} xs={6} className="mt-5">
      <div className="card mb-4">
        <img
          src={ribbon_svg}
          alt="add ribbon"
          className="ribbon_icon"
          onClick={handleMovieClick}
        />
        <p
          className="added_to_watchlist"
          style={{
            display: add ? "" : "none",
          }}
        >
          Added to watchlist
        </p>
        <img
          height="65%"
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={`${title} Poster`}
          className="card-img-top"
        />
        <div className="card-body default_bg">
          <h3
            className="card-title card_title"
            onClick={handleMovieClick}
          >
            {title}
          </h3>
          <p className="card-text card_text">
            Release Date: {release_date}
          </p>
        </div>
      </div>
    </Col>
  );
};

export default MovieCard;
