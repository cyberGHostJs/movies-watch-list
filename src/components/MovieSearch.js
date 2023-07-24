import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Navigation from "./Navigation";
import { Col, Container, Row } from "react-bootstrap";

const MovieSearch = ({ watchlist, onWatchlistChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [myWatchlist, setMyWatchlist] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const addToWatchlist = (movieData) => {
    // Retrieve the existing watchlist from local storage (if any)
    const existingWatchlist =
      JSON.parse(localStorage.getItem("watchlist")) || [];

    // Check if the movie is already in the watchlist
    const isMovieInWatchlist = existingWatchlist.some(
      (movie) => movie.id === movieData.id
    );

    if (!isMovieInWatchlist) {
      // Add the new movie data to the watchlist
      existingWatchlist.push(movieData);
      // Update the watchlist in local storage
      localStorage.setItem("watchlist", JSON.stringify(existingWatchlist));
      // You can also update your state or perform other actions as needed
    }
  };

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setMyWatchlist(JSON.parse(savedWatchlist));
    }

    // Set up an interval to fetch the data from localStorage every 30 seconds
    const interval = setInterval(() => {
      const updatedWatchlist = localStorage.getItem("watchlist");
      if (updatedWatchlist) {
        setMyWatchlist(JSON.parse(updatedWatchlist));
      }
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <Container fluid id="parent" className="movieSearch_container">
      <Navigation />
      <Col sm="12" lg="3" className="search_container">
        <input
          width="50%"
          className="search_input"
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <p
        className="my_list_header"
        >
          My Lists
        </p>
        <div className="my_list">
          <ul>
            {myWatchlist.map((movie) => (
              <li key={movie.id}>
                <label>
                  <span
                  className="myWatchlist"
                    style={{
                      textDecoration: movie.watched ? "line-through" : "none"
                    }}
                  >
                    {movie.title}
                  </span>
                </label>
                <br />
                <span style={{ fontSize: "70%" }}>
                  Release date: {movie.release_date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Col>
      <Row
      className="searchResult_container"
      >
        <h2 className="text-white">Search Results:</h2>

        {watchlist.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onWatchlistChange={onWatchlistChange}
            onAddToWatchlist={addToWatchlist} // Pass the onAddToWatchlist function to MovieCard
          />
        ))}
      </Row>
    </Container>
  );
};

export default MovieSearch;
