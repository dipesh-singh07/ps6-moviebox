
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import ShowDetails from "./components/ShowDetails";
import "./App.css";

function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to MovieBoox</h1>
      <p>Discover movies, ratings, and cast details</p>
      <Link to="/movies" className="btn">Browse Movies</Link>
    </div>
  );
}
function Movies() {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  useEffect(() => {
    async function getShows() {
      const response = await fetch("https://api.tvmaze.com/shows?page=0");
      const data = await response.json();
      setShows(data.slice(0, 40));
    }
    getShows();
  }, []);

  let filteredShows = shows.filter((show) => {
    if (!show.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (genre !== "All" && !show.genres.includes(genre)) {
      return false;
    }
    return true;
  });
  return (
    <main className="container">
      <h1>Browse Movies</h1>
      <input placeholder="Search shows..." value={search} onChange={(e) => setSearch(e.target.value)}/>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="All">All Genres</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
        <option value="Action">Action</option>
        <option value="Thriller">Thriller</option>
      </select>
      <div className="movie-grid">
        {filteredShows.map((show) => (
          <MovieCard key={show.id} show={show} />
        ))}
      </div>
    </main>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Movies />} />
        <Route path="/shows/:id" element={<ShowDetails />} />
      </Routes>
    </>
  );
}

export default App;
