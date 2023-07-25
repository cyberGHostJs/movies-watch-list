import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Navigation from "./Navigation";
import { Col, Container, Row } from "react-bootstrap";
import ribbon_svg from "../images/ribbon.svg";


const MovieSearch = ({ watchlist, onWatchlistChange, onSearch }) => {
  //onSearch is the input data passed as prop to the app.js so the handleSearch can use the input data to find movie from the api
  const [searchTerm, setSearchTerm] = useState("");
  const [myWatchlist, setMyWatchlist] = useState([]);
  const [header, setHeader] = useState("")

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
    setHeader("Search Results")
  };

  useEffect(() => {
    if (!searchTerm) {
      onSearch("E"); //replace this with the top ranking
      setHeader("Popular movies right now")
    }
  }, [searchTerm]);

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
        <p className="my_list_header">My Lists</p>
        <div className="my_list">
          <ul>
            {myWatchlist.map((movie) => (
              <li key={movie.id} style={{ marginBottom: "5%" }}>
                <span
                  className="myWatchlist"
                  style={{
                    textDecoration: movie.watched ? "line-through" : "none",
                  }}
                >
                  {movie.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Col>
      <Row className="searchResult_container">
        <Col xs="12" style={{ border: "2px solid #f33f3f", padding: "3%", borderRadius: "10px", marginBottom: "5% ", background: "rgba(255, 255, 255, 0.097)" }}>
          <h3 style={{ color: "white" }}>
            Welcome to <span style={{ color: "#f33f3f"}}>MovFlix</span>
          </h3>
          <p style={{ color: "white" }}>
            Browse movies and add them to your watchlist.
            Just click the <img src={ribbon_svg} alt="ribbon"/> or movie title to add a movie. Click the checkbox on poster in the watchlist page to
            mark the movie as watched.
          </p>
        </Col>
        <h2 className="text-white">{header}</h2>

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
