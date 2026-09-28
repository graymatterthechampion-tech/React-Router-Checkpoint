import Filter from '../components/Filter';
import MovieList from '../components/MovieList';
import AddMovie from '../components/AddMovie';

export default function Home({
  movies,
  titleFilter,
  ratingFilter,
  onTitleChange,
  onRatingChange,
  onAddMovie,
}) {
  return (
    <>
      <Filter
        title={titleFilter}
        rating={ratingFilter}
        onTitleChange={onTitleChange}
        onRatingChange={onRatingChange}
      />
      <MovieList movies={movies} />
      <AddMovie onAdd={onAddMovie} />
    </>
  );
}