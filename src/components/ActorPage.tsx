import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieInterface, ActorInterface } from "../interfaces/Interfaces";
import { getData, getImage } from "../lib/api";

const ActorPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [actor, setMovie]: [ActorInterface, any] = useState({});
  const getDataHandler = useCallback(async () => {
    setIsLoading(true);
    const data = await getData(`/person/${id}`, '&append_to_response=combined_credits');
    if (data) {
      setMovie(data);
    } else {
      setError('Aucune personne trouvée')
    }
    setIsLoading(false);
  }, [id]);
  useEffect((): any => {
    getDataHandler();
  }, [getDataHandler]);
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p>;
  return <div className="actorPage">
    <div className="wrapper">
      <div className="container">
        <img className="poster" src={getImage(actor.profile_path, 'poster')} alt="" />
        <div className="infos">
          <h1 className="name">{actor.name}</h1>
          <p className="bithday"><b>Birthday : </b>{actor.birthday}</p>
          <p className="place"><b>Place of Birth : </b>{actor.place_of_birth}</p>
          <p className="biography">{actor.biography}</p>
        </div>
      </div>
      <div className="container">
        <div className="castContainer">
          <h2 className="castContainerTitle">Acting</h2>
          <div className="castList">
          {actor.combined_credits?.cast?.map((cast, key) => {
            if (!cast.character || !cast.release_date || !cast.title) return;
            return (
              <div className="cast" key={'cast'+key}>
                <p className="castDate">{cast.release_date}</p>
                <p className="castTitle">{cast.title}</p>
                <p className="castChar">as {cast.character}</p>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default ActorPage;