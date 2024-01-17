import React from 'react';
import './MovieForm.css';

const MovieForm = ({ newMovie, onInputChange, onAddMovie }) => {
  return (
    <form className="movie-form">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={newMovie.title}
        onChange={onInputChange}
      />
      <label htmlFor="openingText">Opening Text:</label>
      <textarea
        id="openingText"
        name="openingText"
        value={newMovie.openingText}
        onChange={onInputChange}
      />
      <label htmlFor="releaseDate">Release Date:</label>
      <input
        type="text"
        id="releaseDate"
        name="releaseDate"
        value={newMovie.releaseDate}
        onChange={onInputChange}
      />
      <button type="button" className="custom-button" onClick={onAddMovie}>
        Add Movie
      </button>
    </form>
  );
};

export default MovieForm;