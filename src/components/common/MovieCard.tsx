import { Link } from "react-router-dom";
import { MovieInterface } from "../../interfaces/Interfaces";
import { getImage } from "../../lib/api";

interface Props {
  movie: MovieInterface;
}
const MovieCard: React.FC<Props> = ({ movie }) => {
  return <div className="movieCard">
    <Link to={`/films/${movie.id}`}>
      <div className="imgContainer" style={{backgroundImage: `url(${getImage(movie.poster_path, 'poster')})`}}></div>
      <div className="movieCardData">
        <p className="movieCardTitle">{movie.name || movie.title}</p>
        <p className="movieCardRelease">{movie.first_air_date || movie.release_date}</p>
      </div>
    </Link>
  </div>
}

export default MovieCard;