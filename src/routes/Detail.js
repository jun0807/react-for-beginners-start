import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Movie from '../components/Movie';
import { Link } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, [id]);
  return (
    <div>
      {loading ? (
        <h1>Loading ... </h1>
      ) : (
        <div>
          <h1>{movies.title_long}</h1>
          <img src={movies.large_cover_image} alt={movies.title} />
          <h4>
            year: {movies.year} rating: {movies.rating} runtime:
            {`${movies.runtime}minutes`}
          </h4>
          <h3>description: {movies.description_full}</h3>
          <p>If you want to see this movie.. Click this! </p>
          <Link to={movies.url}>Go to movie</Link>
        </div>
      )}
    </div>
  );
}
export default Detail;
