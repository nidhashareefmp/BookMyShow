import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const query = new URLSearchParams(useLocation().search).get("query");
  const movies = ["Avatar", "Jawan", "Leo", "Pushpa", "Salaar"];

  const results = movies.filter(movie =>
    movie.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div style={{ paddingTop: "100px", color: "white" }}>
      <h3>Search Results for "{query}"</h3>

      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        results.map((movie, index) => (
          <div key={index}>{movie}</div>
        ))
      )}
    </div>
  );
}
