import { useState } from 'react';
import toEmbedURL from '../utils/toEmbedURL';

const EMPTY_FORM = { title: '', description: '', posterURL: '', trailerURL: '', rating: '' };

export default function AddMovie({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = form.title.trim();
    const description = form.description.trim();
    const posterURL = form.posterURL.trim();
    const rating = Number(form.rating);
    const trailerURL = toEmbedURL(form.trailerURL);

    if (title === '' || description === '' || posterURL === '' || form.rating === '') {
      setError('Please fill in every field.');
      return;
    }
    if (!/^https?:\/\//i.test(posterURL)) {
      setError('Poster URL must start with http:// or https://');
      return;
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      setError('Rating must be a whole number from 1 to 5.');
      return;
    }
    if (trailerURL === null) {
      setError('Trailer must be a YouTube link or a video embed link starting with https://');
      return;
    }

    onAdd({ id: Date.now(), title, description, posterURL, trailerURL, rating });
    setForm(EMPTY_FORM);
    setError('');
  };

  return (
    <form className="add-movie" onSubmit={handleSubmit}>
      <h2>Add a movie</h2>
      <input
        name="title"
        placeholder="Title"
        aria-label="Title"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        aria-label="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="posterURL"
        placeholder="Poster URL (https://...)"
        aria-label="Poster URL"
        value={form.posterURL}
        onChange={handleChange}
      />
      <input
        name="trailerURL"
        placeholder="Trailer link (optional — any YouTube link)"
        aria-label="Trailer URL"
        value={form.trailerURL}
        onChange={handleChange}
      />
      <select name="rating" aria-label="Rating" value={form.rating} onChange={handleChange}>
        <option value="">Choose a rating</option>
        <option value="1">1 ★</option>
        <option value="2">2 ★★</option>
        <option value="3">3 ★★★</option>
        <option value="4">4 ★★★★</option>
        <option value="5">5 ★★★★★</option>
      </select>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit">Add movie</button>
    </form>
  );
}