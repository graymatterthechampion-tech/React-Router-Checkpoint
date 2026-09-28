import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="movie-details">
      <h2>Page not found</h2>
      <p>That page doesn't exist.</p>
      <Link to="/" className="back-link">← Back to home</Link>
    </section>
  );
}