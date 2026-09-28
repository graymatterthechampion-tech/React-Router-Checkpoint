import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import toEmbedURL from '../utils/toEmbedURL';

export default function MovieDetails({ movies }) {
  const { id } = useParams();
  const movie = movies.find((item) => String(item.id) === id);

  // Start at the top of the page, not wherever you were scrolled on the list.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) {
    return (
      <section className="movie-details">
        <Link to="/" className="back-link">← Back to home</Link>
        <h2>Movie not found</h2>
        <p>There's no movie with this link. It may have been added in a session that has since been refreshed.</p>
      </section>
    );
  }

  const { title, description, rating } = movie;
  const embedURL = toEmbedURL(movie.trailerURL);

  return (
    <section className="movie-details">
      <Link to="/" className="back-link">← Back to home</Link>
      <h2>{title}</h2>
      <p className="movie-rating">★ {rating}/5</p>
      <p className="details-description">{description}</p>

      {embedURL ? (
        <div className="trailer">
          <iframe
            src={embedURL}
            title={`${title} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="no-trailer">No trailer available for this movie.</p>
      )}
    </section>
  );
}