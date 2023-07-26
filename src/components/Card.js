import React from "react";
import { Card } from "react-bootstrap";
import MovieRating from "./MovieRating";

const MyCard = ({
  imageUrl,
  caption,
  date,
  textDecoration,
  vote_average,
  id,
  handleRatingChange,
  radioName,
  radioChecked,
  handleWatchedToggle_movieId,
  handleRemoveMovie_movieId,
}) => {
  return (
    <Card>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body style={{ background: "grey" }}>
        <input
          style={{
            cursor: "pointer",
            transform: "scale(2)",
            color: "black",
            background: "green",
            position: "absolute",
            right: "6%",
            bottom: "95%",
          }}
          type="checkbox"
          name={radioName}
          checked={radioChecked}
          onChange={handleWatchedToggle_movieId}
        />
        <button
          onClick={handleRemoveMovie_movieId}
          style={{
            position: "absolute",
            right: "0",
            bottom: "2%",
            background: "none",
            border: "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="27"
            fill="black"
            className="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
        </button>
        <Card.Title
          style={{ textDecoration: textDecoration, cursor: "pointer" }}
        >
          {caption}
        </Card.Title>
        <Card.Text>Release Date: {date}</Card.Text>
        <Card.Text>
          <MovieRating
            voteAverage={vote_average}
            movieId={id}
            onChangeRating={handleRatingChange}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
