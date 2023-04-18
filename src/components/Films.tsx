import { useCallback, useEffect, useState } from "react";
import { MovieInterface } from "../interfaces/Interfaces";
import { getData } from "../lib/api";
import MovieCard from "./common/MovieCard";

const Films = () => {
  const [films, setFilms]: [MovieInterface[], any] = useState([]);
  const [genres, setGenres]: [Array<{id:number, name: string}>, any] = useState([]);
  const getMovieHandler = useCallback(async () => {
    const data: any = await getData(`/movie/top_rated`).catch(() => null);;
    setFilms(data?.results ? data.results : []);
  }, []);
  const getGenres = useCallback(async () => {
    const data: any = await getData(`/genre/movie/list`).catch(() => null);;
    setGenres(data?.genres ? data.genres : []);
  }, []);
  const getByGenre = async (id: number) => {
    const data: any = await getData(`/discover/movie`, `&with_genres=${id}`).catch(() => null);
    setFilms(data?.results ? data.results : []);
  };
  useEffect((): any => {
    getMovieHandler();
    getGenres();
  }, [getMovieHandler, getGenres]);
  return <div className="page filmsPage">
    <div className="filmsPageContainer">
      <div className="genresContainer">
        {!!genres.length && genres.map(({id, name}, key) => <div className="genre" onClick={() => getByGenre(id)} key={'genre' + key}>{name}</div>)}
      </div>
      <div className="filmsContainer">
        {!!films.length && films.map((movie, key) => <MovieCard key={'card' + key} movie={movie}/>)}
      </div>
    </div>
  </div>
}

export default Films;