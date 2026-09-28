export default function Filter({ title, rating, onTitleChange, onRatingChange }) {
  return (
    <section className="filter">
      <input
        type="text"
        placeholder="Search by title..."
        aria-label="Filter by title"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
      />
      <select
        aria-label="Filter by minimum rating"
        value={rating}
        onChange={(event) => onRatingChange(Number(event.target.value))}
      >
        <option value={0}>All ratings</option>
        <option value={1}>★ 1 and up</option>
        <option value={2}>★★ 2 and up</option>
        <option value={3}>★★★ 3 and up</option>
        <option value={4}>★★★★ 4 and up</option>
        <option value={5}>★★★★★ 5 only</option>
      </select>
    </section>
  );
}