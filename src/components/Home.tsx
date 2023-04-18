import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from "../context/redux";
import { MovieInterface } from "../interfaces/Interfaces";
import { getData } from "../lib/api";
import lord from '../assets/lord.png';
import oblivion from '../assets/oblivion.png';
import wakanda from '../assets/wakanda.png';
import spiderman from '../assets/spiderman.png';

const Home = () => {
  const [movies, setMovies]: [MovieInterface[], any] = useState([]);
  const helperData = [
    {id: 75612, image: 'oblivion'},
    {id: 505642, image: 'wakanda'},
    {id: 122, image: 'lord'},
    {id: 102382, image: 'spiderman'},
  ];
  const images: any = { oblivion, lord, wakanda, spiderman };
  const getDataHandler = useCallback(async () => {
    const promises = helperData.map(({id}) => getData(`/movie/${id}`));
    const data: any = await Promise.all(promises).catch(() => null);
    setMovies(data);
  }, []);
  useEffect((): any => {
    getDataHandler();
  }, [getDataHandler]);
  return (
    <div className="home">
      {movies.map((movie, index) => {
        return <div className="movie" key={'movie' + index}>
          <img className="movieImage" src={images[helperData[index].image]} alt="" />
          <div className={`movieInfos ${index % 2 ? 'even' : 'odd'}`}>
            <div className="title">{movie.title}</div>
            <p className="content">{movie.overview}</p>
            <Link to={`/films/${movie.id}`} className="cta">Learn more</Link>
          </div>
        </div>
      })
      }
    </div>
  )
}

export default Home;