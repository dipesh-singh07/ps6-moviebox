
import { Link } from 'react-router-dom';

function MovieCard({ show }) {
  let poster = 'https://placehold.co/210x295?text=No+Image';

  if (show.image && show.image.medium) {
    poster = show.image.medium;
  }

  let rating = 'N/A';

  if (show.rating && show.rating.average != null) {
    rating = show.rating.average;
  }

  let genres = 'Genre unavailable';

  if (show.genres && show.genres.length > 0) {
    genres = show.genres.join(', ');
  }

  return (
    <div className="movie-card">
      <Link to={`/shows/${show.id}`} className="card-link">
        <img
          src={poster}
          alt={show.name}
          className="movie-poster"
        />

        <div className="card-info">
          <h3>{show.name}</h3>
          <p className="rating">⭐ {rating}</p>
          <p className="genres">{genres}</p>
          <span className="details-link">View Details →</span>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
