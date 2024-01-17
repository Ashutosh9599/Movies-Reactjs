import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformedMovies);
      setRetrying(false); 
    } catch (error) {
      setError(error.message);
      setRetrying(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  useEffect(() => {
    if (retrying) {
      const retryTimer = setTimeout(() => {
        fetchMoviesHandler();
      }, 5000);

      return () => clearTimeout(retryTimer);
    }
  }, [retrying, fetchMoviesHandler]);
  const cancelRetryHandler = useCallback(() => {
    setRetrying(false);
  }, []);
  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error && retrying) {
    content = (
      <div>
        <p>{error}</p>
        <p>Retrying...</p>
        <button onClick={cancelRetryHandler}>Cancel Retry</button>
      </div>
    );
  } else if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} disabled={retrying}>
          Fetch Movies
        </button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}
export default App;
