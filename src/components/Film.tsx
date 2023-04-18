import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MovieInterface } from "../interfaces/Interfaces";
import { getImage, getData, minsToHours } from "../lib/api";
import Review from "./common/Review";

const Film = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [movie, setMovie]: [MovieInterface, any] = useState({});
  const desktop = useSelector((state: any) => state.desktop);
  const getMovieHandler = useCallback(async () => {
    setIsLoading(true);
    const data = await getData(`/movie/${id}`, '&append_to_response=credits,reviews,keywords,images');
    console.log({data});
    if (data) {
      setMovie(data);
    } else {
      setError('Aucun film trouvé')
    }
    setIsLoading(false);
  }, [id]);
  useEffect((): any => {
    getMovieHandler();
  }, [getMovieHandler]);
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p>;
  return (
    <div className="moviePage">
    <div className="movieInfosWrapper" style={desktop ? {backgroundImage:`url(${getImage(movie.poster_path, 'big')})`} : {}}>
      <div className="movieInfosBack">
        <div className="movieInfosContainer">
          <img className="image" src={getImage(movie.poster_path, 'poster')}/>
          <div className="movieInfos">
            <h1 className="title mb20">{movie?.title}</h1>
            <div className="tagline mb10">{movie.tagline}</div>
            <p className="date mb10">Release date: {movie.release_date}</p>
            <div className="genres mb10">Genres: &nbsp;&nbsp; {movie.genres?.map(({name}) => name).join(' , ')}</div>
            <p className="greenBack mb10">Duration: {minsToHours(movie.runtime as number)}</p>
            <div className="popularityContainer mb10">User score: <span className="score">{Math.floor(movie.popularity as number)}%</span></div>
            <div className="greenBack mb10">Budget: ${movie.budget}</div>
            <p className="greenBack mb10">Votes: {movie.vote_count}</p>
            <p className="greenBack mb10">Vote average: {`${movie.vote_average}`.slice(0,3)}</p>
            <h2>Overview</h2>
            <p className="overview mb10">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="personWrapper">
      <div className="personsContainer">
        <h2>Actors</h2>
        <div className="persons">
          {movie.credits?.cast?.slice(0, 10).map((person, key) => {
            if(!person.profile_path) return;
            return <Link to={`/actors/${person.id}`} key={'person' + key} className="person">
              <img src={getImage(person.profile_path, 'face')} alt="" />
              <div className="personData">
                <b>{person.name}</b>
                <p>{person.character}</p>
              </div>
            </Link>;
          })}
        </div>
      </div>
    </div>
    <div className="reviewsWrapper">
      <div className="reviewsContainer">
        <h2 className="title">Comments</h2>
        <div className="reviews">
          {movie.reviews?.results?.map((review, key) => <Review key={'review'+key} review={review}/>)}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Film;