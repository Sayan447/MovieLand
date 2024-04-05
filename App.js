import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';

import MovieCard from './MovieCard';

// API key - 874263d7

const API_URL = 'http://www.omdbapi.com?apikey=874263d7';

const movie1 = {
  Title: 'Kenshi Ironman: The Thunderdome',
  Year: '2018',
  imdbID: 'tt11459796',
  Type: 'movie',
  Poster: 'N/A',
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);


  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie("Batman");
  }, []);

  return (
    <div className='app'>
      {/* it gets positioned nicely in the middle */}
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />

        <img src={SearchIcon} alt='Search' onClick={() => searchMovie(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
