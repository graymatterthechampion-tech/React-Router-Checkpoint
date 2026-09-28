import { Link } from 'react-router-dom';

const FALLBACK_POSTER = 'https://placehold.co/300x450?text=No+Poster';
const MAX_RATING = 5;

export default function MovieCard({ movie }) {
  const { id, title, description, posterURL, rating } = movie;

  
  const safeRating = Math.min(MAX_RATING, Math.max(0, Math.round(rating)));
  const stars = '★'.repeat(safeRating) + '☆'.repeat(MAX_RATING - safeRating);

  const handleImageError = (event) => {
    // Only swap once, so a broken fallback can't cause an endless loop.
    if (event.currentTarget.src !== FALLBACK_POSTER) {
      event.currentTarget.src = FALLBACK_POSTER;
    }
  };

  return (
    <Link to={`/movies/${id}`} className="movie-card-link">
      <article className="movie-card">
        <img
          className="movie-poster"
          src={posterURL}
          alt={`${title} poster`}
          onError={handleImageError}
        />
        <div className="movie-info">
          <h3>{title}</h3>
          <p className="movie-rating" aria-label={`Rating: ${safeRating} out of ${MAX_RATING}`}>
            {stars} <span>{safeRating}/{MAX_RATING}</span>
          </p>
          <p className="movie-description">{description}</p>
        </div>
      </article>
    </Link>
  );
}