import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await res.json();
        setShow(data);
        const castDetails = await fetch(
          `https://api.tvmaze.com/shows/${id}/cast`,
        );
        const castData = await castDetails.json();
        setCast(Array.isArray(castData) ? castData : []);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [id]);
  if (!show) return <p>Loading...</p>;
  let summary = "No summary available.";

  if (show.summary) {
    summary = show.summary;
  }
  return (
    <div className="details-page">
      <Link to="/shows">Back to Shows</Link>
      <h1>{show.name}</h1>
      {show.image && <img src={show.image.medium} alt={show.name} />}
      <p>Rating: {show.rating?.average || "N/A"}</p>
      <p>Genres: {show.genres?.join(", ") || "N/A"}</p>
      <p>Language: {show.language || "N/A"}</p>
      <p>Premiered: {show.premiered || "N/A"}</p>
      <p>{summary}</p>
      <h2>Cast</h2>
      {Array.isArray(cast) &&
        cast.map((member, index) => (
          <div key={index}>
            <p>
              {member.person?.name} as {member.character?.name}
            </p>
          </div>
        ))}
    </div>
  );
}

export default ShowDetails;
