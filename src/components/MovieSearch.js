import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Navigation from "./Navigation";
import { Col, Container, Row } from "react-bootstrap";
import ribbon_svg from "../images/ribbon.svg";
import ErrorPage from "./ErrorPage";

const MovieSearch = ({ watchlist, onWatchlistChange, onSearch, fetchErr }) => {
  //onSearch is the input data passed as prop to the app.js so the handleSearch can use the input data to find movie from the api
  const [searchTerm, setSearchTerm] = useState("");
  const [myWatchlist, setMyWatchlist] = useState([]);
  const [header, setHeader] = useState("");

  const handleInputChange = (e) => {
    //update search value as user types
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
    setHeader("Search Results");
  };

  // filter movies made in 2023 and display them on page load as latest movies
  const filteredMovies = watchlist.filter((movie) =>
    movie.release_date.includes("2023")
  );
  //unfiltered movies displayed when movie name is searched.
  const unfilteredMovies = watchlist;

  //this displays the movies based on condition (i.e if there's no content in search input, it displays latest movies & handles error)
  const DisplayMovies = () => {
    if (fetchErr) {
      return <ErrorPage />;
    }
    return (
      <>
        {searchTerm ? (
          <>
            {unfilteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onWatchlistChange={onWatchlistChange}
                onAddToWatchlist={addToWatchlist} // Pass the onAddToWatchlist function to MovieCard
              />
            ))}
          </>
        ) : (
          <>
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onWatchlistChange={onWatchlistChange}
                onAddToWatchlist={addToWatchlist} // Pass the onAddToWatchlist function to MovieCard
              />
            ))}
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    if (!searchTerm) {
      onSearch("a"); //2023/ latest movies that begin with "a"
      setHeader("Latest movies right now");
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
        <Col
          xs="12"
          style={{
            border: "2px solid #f33f3f",
            padding: "3%",
            borderRadius: "10px",
            marginBottom: "5% ",
            background: "rgba(255, 255, 255, 0.097)",
          }}
        >
          <h3 style={{ color: "white" }}>
            Welcome to <span style={{ color: "#f33f3f" }}>MovFlix</span>
          </h3>
          <p style={{ color: "white" }}>
            Browse movies and add them to your watchlist. Just click the{" "}
            <img src={ribbon_svg} alt="ribbon" /> or movie title to add a movie.
            Click the checkbox on poster in the watchlist page to mark the movie
            as watched.
          </p>
        </Col>
        <h2 className="text-white">{header}</h2>

        {watchlist.length === 0 && searchTerm && !fetchErr ? (
          <p style={{ color: "grey" }} className="emptyList_alert">
            Movie not Found
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#f33f3f"
              className="bi bi-exclamation-lg exclamation"
              viewBox="0 0 16 16"
            >
              <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
            </svg>
          </p>
        ) : (
          DisplayMovies()
        )}
      </Row>
    </Container>
  );
};

export default MovieSearch;
