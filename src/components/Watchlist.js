import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import MyCard from "./Card";
import { Col, Container, Row } from "react-bootstrap";

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
    //  also trigger a reload of the page to reset the application state
    window.location.reload();
  };

  return (
    <Container
      fluid
      className="default_bg"
      style={{ minHeight: "100vh" }}
    >
      <Navigation />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10% 5%",
        }}
      >
        <h2 style={{ color: "white", fontWeight: "800" }}>My Watchlist</h2>
        {/* <button onClick={handleClearLocalStorage}>Clear Local Storage</button> */}
        {/* <button onClick={handleViewLocalStorage}>View Local Storage Data</button> */}
        <label style={{ color: "white" }}>
          <select
            value={filter}
            onChange={handleFilterChange}
            style={{
              padding: "5%",
              borderRadius: "10px",
              outline: "none",
              background: "#1f1f1f",
              border: "2px solid grey",
              color: "grey",
            }}
          >
            <option value="All">Filter</option>
            <option value="Watched">Watched</option>
            <option value="Unwatched">Unwatched</option>
          </select>
        </label>
      </div>

      {filteredWatchlist.length === 0 ? (
        <p
        className="emptyList_alert"
       
        >
          Your {filter.toLowerCase()} movie list is empty
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
        <Row
          style={{
            padding: "0% 5%",
            listStyle: "none",
            justifyContent: "space-between !important",
          }}
        >
          {filteredWatchlist.map((movie) => (
            <Col lg="3" sm="6" key={movie.id} className="mb-4">
              <MyCard
                imageUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                caption={movie.title}
                date={movie.release_date}
                textDecoration={movie.watched ? "line-through" : "none"}
                vote_average={0}
                id={movie.id}
                handleRatingChange={() => handleRatingChange()}
                radioName={`watched_${movie.id}`}
                radioChecked={movie.watched || false}
                handleWatchedToggle_movieId={() =>
                  handleWatchedToggle(movie.id)
                }
                handleRemoveMovie_movieId={() => handleRemoveMovie(movie.id)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Watchlist;
