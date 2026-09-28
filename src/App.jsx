import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import initialMovies from './data/movies';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/NotFound';

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);

  const handleAddMovie = (newMovie) => {
    setMovies((current) => [...current, newMovie]);
  };

  const searchText = titleFilter.trim().toLowerCase();
  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(searchText);
    const matchesRating = movie.rating >= ratingFilter;
    return matchesTitle && matchesRating;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <Link to="/" className="home-link">🎬 My Favorite Movies</Link>
        </h1>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={filteredMovies}
              titleFilter={titleFilter}
              ratingFilter={ratingFilter}
              onTitleChange={setTitleFilter}
              onRatingChange={setRatingFilter}
              onAddMovie={handleAddMovie}
            />
          }
        />
        <Route path="/movies/:id" element={<MovieDetails movies={movies} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}